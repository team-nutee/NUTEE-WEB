const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const nodemailer = require('nodemailer');
const Sequelize = require('sequelize');
const multer = require('multer');
const path = require('path');
const Op = Sequelize.Op;
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');

require('dotenv').config();

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'images');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            done(null, basename + new Date().valueOf() + ext);
        },
    }),
    limits: { fileSize: 20 * 1024 * 1024 },
});

router.get('/', isLoggedIn, (req, res) => { // /api/user/
    const user = Object.assign({}, req.user.toJSON());
    delete user.password;
    return res.json(user);
});

router.post('/', async (req, res, next) => { // POST /api/user 회원가입
    try {
        const exUser = await db.User.findOne({
            where: {
                userId: req.body.nickname,
            },
        });
        if (exUser) {
            return (
                res.status(409).send('\"message\":\"이미 사용중인 아이디입니다.\"')
            );
        }
        const nickUser = await db.User.findOne({
            where:{
                nickname:req.body.nickname,
            }
        });
        if(nickUser){
            return(
                res.status(409).send('\"message\":\"이미 사용중인 닉네임입니다.\"')
            )
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12); // salt는 10~13 사이로
        const newUser = await db.User.create({
            nickname: req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword,
            schoolEmail:req.body.schoolEmail,
        });
        console.log(newUser);
        return res.status(200).json(newUser);

    } catch (e) {
        console.error(e);
        // 에러 처리를 여기서
        return next(e);
    }
});

router.post('/idcheck',isNotLoggedIn,async(req,res,next)=>{
    try {
        const exUser = await db.User.findOne({
            where: {
                userId: req.body.userId
            },
        });
        if (exUser) {
            return (
                res.status(409).send('\"message\":\"이미 사용중인 아이디입니다.\"')
            );
        }else{
            return(
                res.status(200).send('\"message\":\"아이디 중복체크 성공.\"')
            )
        }
    }catch(e){
        return next(e);
    }
});

router.post('/nicknamecheck',isNotLoggedIn,async(req,res,next)=>{
    try {
        const exUser = await db.User.findOne({
            where: {
                userId: req.body.userId
            },
        });
        if (exUser) {
            return (
                res.status(409).send('\"message\":\"이미 사용중인 닉네임입니다.\"')
            );
        }else{
            return(
                res.status(200).send('\"message\":\"닉네임 중복체크 성공.\"')
            )
        }
    }catch(e){
        return next(e);
    }
});

router.post('/otpsend',isNotLoggedIn, async(req,res,next)=>{
    const exUser = await db.User.findOne({where:{schoolEmail:req.body.schoolEmail}});
    if(exUser){
        return (
            res.status(409).send('\"message\":\"이미 가입된 이메일입니다.\"')
        );
    }else{
        const otp = await Math.floor(Math.random()*100000+10000).toString(); // 메일에 보내질 OTP 내용입니다.
        console.log(otp); // 확인용찍어봄

        let transporter = await nodemailer.createTransport({ // 보내는사람 메일 설정입니다.
            service:'Gmail',
            auth:{
                user:process.env.GOOGLE_EMAIL,
                pass:process.env.GOOGLE_PASSWORD,
            }
        });
        let mailOptions = {  // 받는사람 메일 설정입니다.
            from: process.env.GOOGLE_EMAIL,
            to:req.body.schoolEmail, // form 에서 name schoolEmail로 해주세요.
            subject: 'NUTEE OTP 인증입니다.',
            text:otp,
        };
        transporter.sendMail(mailOptions,(error,info)=>{
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
        console.time('otp암호화시간(디비저장)');
        const hash = await bcrypt.hash(otp,12);
        console.timeEnd('otp암호화시간(디비저장)');
        await db.OTP.create({hash:hash});
        res.status(200).send('\"message\":\"입력하신 이메일로 OTP 인증번호가 발송되었습니다.\"');
    }
});

router.post('/otpcheck', isNotLoggedIn, async (req,res,next)=>{ // OTP 확인 라우터
    try{
        function timedecrement(){
            let now = new Date();
            let year = now.getFullYear();
            let month = now.getMonth()+1;
            let date = now.getDate();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();
            if(hours<10){
                hours = "0"+hours;
            }
            if(minutes<13){
                minutes=minutes-3;
                minutes = "0"+minutes;
            }else{
                minutes-=3;
            }
            if(seconds<10){
                seconds = "0"+seconds;
            }
            return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
        }
        let timedesc3 = timedecrement();

        db.OTP.findAndCountAll({where:{createdAt:{[Op.gt]:timedesc3}}})
            .then(async (result)=>{
                let i;
                for(i = result.count;i>0;i--){
                    let checktrue = bcrypt.compare(req.body.otpcheck ,result.rows[i-1].dataValues.hash);
                    if(checktrue){
                        await db.OTP.destroy({where:{hash:result.rows[i-1].dataValues.hash}});
                        res.status(200).send('\"message\":\"OTP 인증에 성공했습니다.\"');
                        break;
                    }else{
                        continue;
                    }
                }
                if(i===0){
                    res.status(401).send('\"message\":\"잘못된 인증번호입니다.\"');
                }
            });
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/:id', async (req, res, next) => { // 남의 정보 가져오는 것 ex) /api/user/123
    try {
        const user = await db.User.findOne({
            where: { id: parseInt(req.params.id, 10) },
            include: [{
                model: db.Post,
                as: 'Posts',
                attributes: ['id'],
            }, {
                model: db.User,
                as: 'Followings',
                attributes: ['id'],
            }, {
                model: db.User,
                as: 'Followers',
                attributes: ['id'],
            }, {
                model:db.Image,
                attributes: ['src'],
            }],
            attributes: ['id', 'nickname'],
        });
        const jsonUser = user.toJSON();
        jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts : 0;
        jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings : 0;
        jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers : 0;
        res.json(jsonUser);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/logout', (req, res) => { // /api/user/logout
    req.logout();
    req.session.destroy();
    res.send('\"message\": \"logout 성공\"');
});

router.post('/login', (req, res, next) => { // POST /api/user/login
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            try {
                if (loginErr) {
                    return next(loginErr);
                }
                const fullUser = await db.User.findOne({
                    where: { id: user.id },
                    include: [{
                        model: db.Post,
                        as: 'Posts',
                        attributes: ['id'],
                    }, {
                        model: db.User,
                        as: 'Followings',
                        attributes: ['id'],
                    }, {
                        model: db.User,
                        as: 'Followers',
                        attributes: ['id'],
                    }, {
                        model:db.Image,
                        attributes: ['src'],
                    }],
                    attributes: ['id', 'nickname', 'userId'],
                });
                console.log(fullUser);
                return res.json(fullUser);
            } catch (e) {
                next(e);
            }
        });
    })(req, res, next);
});

router.get('/:id/followings', isLoggedIn, async (req, res, next) => { // /api/user/:id/followings
    try {
        const user = await db.User.findOne({
            where: { id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0 },
        });
        const followers = await user.getFollowings({
            attributes: ['id', 'nickname'],
            include:[{
                model: db.Image,
                attribute:['src'],
            }],
            limit: parseInt(req.query.limit, 10),
            offset: parseInt(req.query.offset, 10),
        });
        res.json(followers);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.get('/:id/followers', isLoggedIn, async (req, res, next) => { // /api/user/:id/followers
    try {
        const user = await db.User.findOne({
            where: { id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0 },
        }); // req.params.id가 문자열 '0'
        const followers = await user.getFollowers({
            attributes: ['id', 'nickname'],
            include:[{
                model: db.Image,
                attribute:['src'],
            }],
            limit: parseInt(req.query.limit, 10),
            offset: parseInt(req.query.offset, 10),
        });
        res.json(followers);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.delete('/:id/follower', isLoggedIn, async (req, res, next) => {
    try {
        const me = await db.User.findOne({
            where: { id: req.user.id },
        });
        await me.removeFollower(req.params.id);
        res.send(req.params.id);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
    try {
        const me = await db.User.findOne({
            where: { id: req.user.id },
        });
        await me.addFollowing(req.params.id);
        res.send(req.params.id);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.delete('/:id/follow', isLoggedIn, async (req, res, next) => {
    try {
        const me = await db.User.findOne({
            where: { id: req.user.id },
        });
        await me.removeFollowing(req.params.id);
        res.send(req.params.id);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.get('/:id/posts', async (req, res, next) => {
    try {
        let where = {};
        const posts = await db.Post.findAll({
            where: {
                UserId: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0,
                isDeleted:0,
            },
            include: [{
                model: db.User,
                include:[{
                    model: db.Image,
                    attributes: ['src'],
                }],
                attributes: ['id', 'nickname'],
            }, {
                model: db.Image,
            }, {
                model: db.User,
                through: 'Like',
                as: 'Likers',
                attributes: ['id'],
            }, {
                model: db.Post,
                as: 'Retweet',
                include: [{
                    model: db.User,
                    attributes: ['id', 'nickname'],
                    include:[{
                        model:db.Image,
                        attributes:['src'],
                    }],
                }, {
                    model: db.Image,
                }, {
                    model: db.Comment,
                    required:false,
                    order: [['createdAt', 'ASC']],
                    where:{isDeleted:false,ParentId:null},
                    as:'Comments',
                },{
                    model: db.User,
                    through: 'Like',
                    as: 'Likers',
                    attributes: ['id'],
                }],
            }, {
                model: db.Comment,
                required:false,
                order: [['createdAt', 'ASC']],
                where:{isDeleted:false,ParentId:null},
                as:'Comments',
                include: [{
                    model: db.User,
                    attributes: ['id', 'nickname'],
                }],
            }],
            order: [['createdAt', 'DESC']],
        });
        res.json(posts);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try {
        const exUser = await db.User.findOne({
            where: {
                nickname:req.body.nickname
            }
        });
        if(exUser) {
            return (
                res.status(409).send('\"message\":\"이미 사용중인 닉네임입니다.\"')
            );
        }
        await db.User.update({
            nickname: req.body.nickname,
        }, {
            where: { id: req.user.id },
        });
        res.status(200).send(req.body.nickname);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/reissuance',isNotLoggedIn, async(req,res,next)=>{
    const newPassword = await Math.floor(Math.random()*100000000000+10000000000).toString(); // 메일에 보내질 OTP 내용입니다.
    console.log(newPassword); // 확인용찍어봄
    console.time('암호화 시작');
    const hash = await bcrypt.hash(newPassword, 12);
    console.timeEnd('암호화 완료');
    let transporter = await nodemailer.createTransport({ // 보내는사람 메일 설정입니다.
        service:'Gmail',
        auth:{
            user:process.env.GOOGLE_EMAIL,
            pass:process.env.GOOGLE_PASSWORD,
        }
    });
    let mailOptions = {  // 받는사람 메일 설정입니다.
        from: process.env.GOOGLE_EMAIL,
        to:req.body.schoolEmail, // form 에서 name schoolEmail로 해주세요.
        subject: 'NUTEE 비밀번호 재발급입니다.',
        text:`새 비밀번호는 ${newPassword}`,
    };

    const userfind = await db.User.findOne({where:{schoolEmail:req.body.schoolEmail, userId:req.body.userId}});
    if(userfind){
        await db.User.update({password:hash},{where:{schoolEmail:req.body.schoolEmail}});
        transporter.sendMail(mailOptions,(error,info)=>{
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
            return(
                res.status(200).send('\"message\": \"이메일 발송이 완료되었습니다.\"')
            );
    }else{
        return(
            res.status(401).send('\"message\": \"아이디/이메일이 일치하지 않습니다.\"')
        );
    }
});

router.post('/passwordcheck',isLoggedIn, async(req,res,next)=>{
    const exUser = await db.User.findOne({where:{id:req.user.id}});
    const Userpassword = await bcrypt.compare(req.body.password, exUser.password);
    console.log(exUser);
    console.log(Userpassword);
    if(Userpassword){
        return(
            res.status(200).send('\"message\": \"비밀번호가 확인이 완료되었습니다.\"')
        );
    }else{
        return(
            res.status(401).send('\"message\": \"비밀번호가 일치하지 않습니다.\"')
        );
    }
});

router.post('/passwordchange',isLoggedIn, async(req,res,next)=> {
    console.log(req.body.newpassword);
    console.time('암호화 시작');
    const hash = await bcrypt.hash(req.body.newpassword, 12);
    console.timeEnd('암호화 끝');
    console.log(hash);
    const newpassword = await db.User.update({password: hash}, {where: {id: req.user.id}});
    if (newpassword) {
        return (
            res.status(200).send('\"message\": \"비밀번호가 변경되었습니다.\"')
        );
    } else {
        return (
            res.status(403).send('\"message\": \"비밀번호 변경에 실패하였습니다.\"')
        );
    }
});

router.post('/findid', isNotLoggedIn, async(req,res,next)=> {
    try {
        const exUser = await db.User.findOne({where: {schoolEmail: req.body.schoolEmail}});
        if (!exUser) {
            res.status(401).send('\"message\": \"존재하지 않는 이메일입니다.\"');
        } else {
            let transporter = await nodemailer.createTransport({ // 보내는사람 메일 설정입니다.
                service: 'Gmail',
                auth: {
                    user: process.env.GOOGLE_EMAIL,
                    pass: process.env.GOOGLE_PASSWORD,
                }
            });
            let mailOptions = {  // 받는사람 메일 설정입니다.
                from: process.env.GOOGLE_EMAIL,
                to: req.body.schoolEmail, // form 에서 name schoolEmail로 해주세요.
                subject: 'NUTEE 아이디찾기 결과입니다.',
                text: `입력하신 이메일의 아이디는 ${exUser.userId} 입니다.`,
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.status(200).send('\"message\": \"입력하신 이메일로 아이디가 발송되었습니다.\"');
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});
      
router.post('/profile', isLoggedIn, upload.single('image'), async (req, res, next) => {
    try {
        const image = await db.Image.findOne({
            where:{ UserId:req.user.id }
        });
        if(image) {
            await db.Image.update({
                src: req.file.filename
            }, { where: { UserId: req.user.id },
            });
            res.status(200).json(req.file.filename);
            return;
        } else {
            await db.Image.create({
                src: req.file.filename,
                UserId: req.user.id,
            })
        }
        res.status(200).json(req.file.filename);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.delete('/profile', isLoggedIn, async (req, res, next) => {
    try {
        await db.Image.findOne({ where: { UserId: req.user.id } });
        await db.Image.destroy({ where: { UserId: req.user.id } });
        res.status(200).send('\"message\": \"성공\"');
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;