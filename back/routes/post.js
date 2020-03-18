const express = require('express');
const multer = require('multer');
const path = require('path');

const db = require('../models');
const { isLoggedIn } = require('./middleware');

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

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => { // POST /api/post
    try {
        const hashtags = req.body.content.match(/#[^\s]+/g);
        const newPost = await db.Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        if (hashtags) {
            const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
                where: { name: tag.slice(1).toLowerCase() },
            })));
            console.log(result);
            await newPost.addHashtags(result.map(r => r[0]));
        }
        if (req.body.image) { // 이미지 주소를 여러개 올리면 image: [주소1, 주소2]
            if (Array.isArray(req.body.image)) {
                const images = await Promise.all(req.body.image.map((image) => {
                    return db.Image.create({ src: image });
                }));
                await newPost.addImages(images);
            } else { // 이미지를 하나만 올리면 image: 주소1
                const image = await db.Image.create({ src: req.body.image });
                await newPost.addImage(image);
            }
        }
        const fullPost = await db.Post.findOne({
            where: { id: newPost.id },
            include: [{
                model: db.User,
                include:[{
                   model:db.Image,
                   attributes:['src'],
                }],
                attributes: ['id', 'nickname'],
            }, {
                model: db.Image,
            }, {
                model: db.User,
                as: 'Likers',
                attributes: ['id'],
            }],
        });
        res.json(fullPost);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.patch('/', async (req, res, next) => { //게시물 수정
    try {
        const hashtags = req.body.content.match(/#[^\s]+/g);
        const post = await db.Post.findOne({ where: { id: req.body.postId }});
        if (!post) {
            return res.status(404).send('\"message\": \"수정할 포스트가 존재하지 않습니다.\"');
        }
        if(req.user.id!==post.UserId){
            return res.status(403).send('수정한 권한이 없습니다.');
        }

        //게시 글에 대한 수정
        await db.Post.update({
            content: req.body.content
        }, { where: { id: req.body.postId },
        });

        //게시글에 해당하는 해쉬태그들에 대한 수정
        if (hashtags) {
            await post.removeHashtags(req.body.postId);
            const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
                where: { name: tag.slice(1).toLowerCase() },
            })));
            console.log(result);
            await post.addHashtags(result.map(r => r[0]));
        }

        //이미지 수정 패턴
        if (req.body.image) { // 이미지 주소를 여러개 올리면 image: [주소1, 주소2]
            // await post.removeImages(req.body.postId);
            await db.Image.destroy({ where: { PostId: req.body.postId }});
            if (Array.isArray(req.body.image)) {
                const images = await Promise.all(req.body.image.map((image) => {
                    return db.Image.create({ src: image });
                }));
                await post.addImages(images);
            } else { // 이미지를 하나만 올리면 image: 주소1
                const image = await db.Image.create({ src: req.body.image });
                await post.addImage(image);
            }
        }
        //res로 리턴
        const fullPost = await db.Post.findOne({
            where: { id: req.body.postId },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }, {
                model: db.Image,
            }, {
                model: db.User,
                as: 'Likers',
                attributes: ['id'],
            }],
        });
        res.send(fullPost);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.post('/images', upload.array('image'), (req, res) => {
    console.log(req.files);
    res.json(req.files.map(v => v.filename));
});

router.get('/:id', async (req, res, next) => {
    try {
        const post = await db.Post.findOne({
            where: {id: req.params.id},
            include: [{
                model: db.User,
                include: [{
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
                }, {
                    model: db.Image,
                }, {
                    model: db.Comment,
                    required: false,
                    order: [['createdAt', 'ASC']],
                    where: {isDeleted: false},
                    as: 'Comments',
                }, {
                    model: db.User,
                    through: 'Like',
                    as: 'Likers',
                    attributes: ['id'],
                }],
            }, {
                model: db.Comment,
                required: false,
                order: [['createdAt', 'ASC']],
                where: {isDeleted: false},
                as: 'Comments',
                include: [{
                    model: db.User,
                    attributes: ['id', 'nickname'],
                }],
            }],
        });
        res.json(post);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.delete('/:id', isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).send('\"message\": \"포스트가 존재하지 않습니다.\"');
        }
        if(req.user.id!==post.UserId){
            console.log(req.user.id,post.UserId);
            return res.status(403).send('삭제 할 권한이 없습니다.');
        }
        await db.Post.update( {isDeleted:true},{where: { id: req.params.id } });
        res.status(200).send(req.params.id);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/:id/report', async (req, res, next) => {
   try {
       await db.Report.create({
           content: req.body.content, // 신고 사유
           PostId: req.params.id,
       });
       const result = await db.Report.findAndCountAll({
           where : { PostId: req.params.id }
       });
       if (result.count>=1) {
           const post = await db.Post.update({ isBlocked: true }, { where: { id: req.params.id } });
           res.status(200).json(post);
           return;
       }
       res.status(200).json(req.params.id);
   } catch (err) {
       console.error(err);
       next(err);
   }
});

router.get('/:id/comments', async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).send('\"message\": \"포스트가 존재하지 않습니다.\"');
        }
        const comments = await db.Comment.findAll({
            where: {
                PostId: req.params.id,
                isDeleted:0,
                ParentId : null,
            },
            order: [['createdAt', 'ASC']],
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
                include:[{
                    model:db.Image,
                    attributes:['src']
                }]
            }, {
                model: db.Comment,
                as:'ReComment',
                required:false,
                where:{
                    isDeleted:false
                },
                include: [{
                    model: db.User,
                    attributes: ['id', 'nickname'],
                    include:[{
                        model:db.Image,
                        attributes:['src']
                    }]
                }],
            }],
            as:'Comment',
            limit: parseInt(req.query.limit),
            offset: parseInt(req.query.offset),
        });
        res.json(comments);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/:id/comment', isLoggedIn, async (req, res, next) => { // POST /api/post/1000000/comment
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).send('\"message\": \"포스트가 존재하지 않습니다.\"');
        }
        const newComment = await db.Comment.create({
            PostId: post.id,
            UserId: req.user.id,
            content: req.body.content,
        });
        await post.addComment(newComment.id);
        const comment = await db.Comment.findOne({
            where: {
                id: newComment.id,
            },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
                include:[{
                    model:db.Image,
                    attributes:['src']
                }]
            }],
        });
        return res.json(comment);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.patch('/:postId/comment/:id', isLoggedIn, async (req, res, next) => {
    try {
        const comment = await db.Comment.findOne({
            where: {
                id: req.params.id,
            },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }],
        });
        if(req.user.id!==comment.UserId){
            return res.status(403).send('수정 할 권한이 없습니다.');
        }
        const result = await db.Comment.update({ content: req.body.content
        }, { where: {
                id: req.params.id,
                UserId: req.user.id,
            },
        });
        res.status(200).json(result);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.post('/:postId/comment/:parentId', isLoggedIn, async (req, res, next) => { // POST /api/post/10/comment/2
    try {
        const post = await db.Post.findOne({ where: { id: req.params.postId } });
        if (!post) {
            return res.status(404).send('\"message\": \"포스트가 존재하지 않습니다.\"');
        }
        const comment = await db.Comment.findOne({ where: { id: req.params.parentId } });
        if (!comment) {
            return res.status(404).send('\"message\": \"댓글이 존재하지 않습니다.\"');
        }
        const reComment = await db.Comment.create({
            PostId: req.params.postId,
            UserId: req.user.id,
            content: req.body.content,
            ParentId: req.params.parentId,
        });
        await post.addComment(reComment.id);
        const comments = await db.Comment.findOne({
            where: {
                id: reComment.id,
            },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
                include:[{
                    model:db.Image,
                    attributes:['src']
                }]
            }],
        });
        return res.json(comments);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.delete('/:postId/comment/:id', isLoggedIn, async (req, res, next) => {
    try {
        const comment = await db.Comment.findOne({
            where: {
                id: req.params.id,
            },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }],
        });
        if(req.user.id!==comment.UserId){
            return res.status(403).send('삭제 할 권한이 없습니다.');
        }
        await db.Comment.update({isDeleted:1},{ where: { id: req.params.id, UserId: req.user.id, } });
        res.status(200).json({
            postId:req.params.postId,
            commentId:req.params.id
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/:id/like', isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id }});
        if (!post) {
            return res.status(404).send('\"message\": \"포스트가 존재하지 않습니다.\"');
        }
        await post.addLikers(req.user.id);
        res.json({ userId: req.user.id });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.delete('/:id/like', isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id }});
        if (!post) {
            return res.status(404).send('\"message\": \"포스트가 존재하지 않습니다.\"');
        }
        await post.removeLiker(req.user.id);
        res.json({ userId: req.user.id });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/:id/retweet', isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({
            where: { id: req.params.id },
            include: [{
                model: db.Post,
                as: 'Retweet',
            }],
        });
        if (!post) {
            return res.status(404).send('\"message\": \"포스트가 존재하지 않습니다.\"');
        }
        if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
            return res.status(403).send('\"message\": \"자신의 글은 리트윗할 수 없습니다.\"');
        }
        const retweetTargetId = post.RetweetId || post.id;
        const exPost = await db.Post.findOne({
            where: {
                UserId: req.user.id,
                RetweetId: retweetTargetId,
            },
        });
        if (exPost) {
            return res.status(403).send('\"message\": \"이미 리트윗했습니다.\"');
        }
        const retweet = await db.Post.create({
            UserId: req.user.id,
            RetweetId: retweetTargetId,
            content: 'retweet',
        });
        const retweetWithPrevPost = await db.Post.findOne({
            where: { id: retweet.id },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }, {
                model: db.Post,
                as: 'Retweet',
                include: [{
                    model: db.User,
                    attributes: ['id', 'nickname'],
                }, {
                    model: db.Image,
                }],
            }],
        });
        res.json(retweetWithPrevPost);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;