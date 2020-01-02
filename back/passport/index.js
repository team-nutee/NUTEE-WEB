const passport = require('passport');
const db = require('../models');
const local = require('./local');

module.exports = () => {
    passport.serializeUser((user, done) => {//서버쪽에 [{id:3, cookie:'asdf'}]
        return done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await db.User.findOne({
                where: {id},
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
                }],
            });
            return done(null, user); //req.user에 저장됨
        } catch (e) {
            console.error(e);
            return done(e);
        }
    });

    local();
};

//프론트에서 서버로는 cookie만 보낸다.
//서버가 쿠키파서, 익스프레스 세션으로 쿠키 검사 후 id:3 발견
//id:3이 deserializeUser에 들어감
//req.user로 사용자 정보가 들어감.

//요청 보낼 때 마다 deserializeUser가 실행됨
//실무에서는 deserializeUser 결과물 캐싱함.
//db요청이 서버 작업중에서 가장 비싼 작업이다. 디비 요청을 줄이는게 서버 비용을 절감하는 길이다.