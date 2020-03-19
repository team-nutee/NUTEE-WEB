const underscore =require('underscore');

const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/:text', async (req, res,next) => {
    try {
        const searchText = decodeURIComponent(req.params.text);
        console.log(searchText);
        const writer = await db.User.findOne({
            where: {
                nickname: {
                    [db.Sequelize.Op.like]: '%'+searchText+'%'
                }
            },
            order: [['createdAt', 'DESC']]
        });
        if(writer){
            const id = writer.id;
            let where = {
                isDeleted:0,
                UserId: id,
            };
            if (parseInt(req.query.lastId, 10)) {
                where = {
                    id: {
                        [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10), // less than
                    },
                    isDeleted:0,
                    UserId: id,
                };
            }
            const searchByNickname = await db.Post.findAll({
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
                    where:{isDeleted:false},
                    as:'Comments',
                    include: [{
                        model: db.User,
                        attributes: ['id', 'nickname'],
                    }],
                }],
                order: [['createdAt', 'DESC']], // DESC는 내림차순, ASC는 오름차순
                limit: parseInt(req.query.limit, 10),
            });

            where = {
                isDeleted:0,
                content: {
                    [db.Sequelize.Op.like]: '%'+searchText+'%'
                }
            };
            if (parseInt(req.query.lastId, 10)) {
                where = {
                    id: {
                        [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10), // less than
                    },
                    isDeleted:0,
                    content: {
                        [db.Sequelize.Op.like]: '%'+searchText+'%'
                    }
                };
            }
            const searchByContents = await db.Post.findAll({
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
                    where:{isDeleted:false},
                    as:'Comments',
                    include: [{
                        model: db.User,
                        attributes: ['id', 'nickname'],
                    }],
                }],
                order: [['createdAt', 'DESC']], // DESC는 내림차순, ASC는 오름차순
                limit: parseInt(req.query.limit, 10),
            });
            const searchAll = searchByContents.concat(searchByNickname)
                .sort(function (a, b) {
                    if (a.createdAt < b.createdAt) {
                        return 1;
                    }
                    if (a.createdAt > b.createdAt) {
                        return -1;
                    }
                    return 0;
                });
            const result = underscore.uniq(searchAll,'id');
            res.json(result);
        }else{
            let where = {
                isDeleted:0,
                content: {
                    [db.Sequelize.Op.like]: '%'+searchText+'%'
                }
            };
            if (parseInt(req.query.lastId, 10)) {
                where = {
                    id: {
                        [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10), // less than
                    },
                    isDeleted:0,
                    content: {
                        [db.Sequelize.Op.like]: '%'+searchText+'%'
                    }
                };
            }
            const searchByContents = await db.Post.findAll({
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
                    where:{isDeleted:false},
                    as:'Comments',
                    include: [{
                        model: db.User,
                        attributes: ['id', 'nickname'],
                    }],
                }],
                order: [['createdAt', 'DESC']], // DESC는 내림차순, ASC는 오름차순
                limit: parseInt(req.query.limit, 10),
            });
            res.json(searchByContents);
        }

    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;