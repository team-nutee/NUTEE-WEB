const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /api/posts
    try {
        let where = {isDeleted:0};
        if (parseInt(req.query.lastId)) {
            where = {
                id: {
                    [db.Sequelize.Op.lt]: parseInt(req.query.lastId), // less than
                },
                isDeleted:0,
            };
        }
        const posts = await db.Post.findAll({
            where,
            include: [{
                model: db.User,
                include:[{
                    model:db.Image,
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
                    include:[{
                        model:db.Image,
                        attributes: ['src'],
                    }],
                    attributes: ['id', 'nickname'],
                }, {
                    model: db.Image,
                }, {
                    model: db.Comment,
                    required:false,
                    order: [['createdAt', 'ASC']],
                    where:{isDeleted:false},
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
                where:{
                    isDeleted: false,
                    ParentId : null,
                },
                as:'Comments',
                include: [{
                    model: db.User,
                    attributes: ['id', 'nickname'],
                    include:[{
                        model:db.Image,
                        attributes:['src']
                    }]
                }, {
                    model: db.User,
                    through: 'commentLike',
                    as: 'commentLikers',
                    attributes: ['id'],
                }, {
                    model: db.Comment,
                    as:'ReComment',
                    where: {isDeleted:false},
                    required:false,
                    include: [{
                        model: db.User,
                        attributes: ['id', 'nickname'],
                        include:[{
                            model:db.Image,
                            attributes:['src']
                        }]
                    }],
                }],
            }],
            order: [['createdAt', 'DESC']], // DESC는 내림차순, ASC는 오름차순
            limit: parseInt(req.query.limit),
        });
        res.json(posts);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;