module.exports = (sequelize,DataTypes) => {
    const Comment = sequelize.define('Comment', {
        content:{
            type: DataTypes.TEXT,//매우 긴 글
            allowNull: false,
        },
        isDeleted:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false,
        },
    }, {
        charset :'utf8mb4',//한글 + 이모티콘
        collate : 'utf8mb4_general_ci',
    });

    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
        db.Comment.hasMany(db.Comment,{as:'ReComment', foreignKey:'ParentId'});
        db.Comment.belongsToMany(db.User, {through:'commentLike', as: 'commentLikers'});
    };
    return Comment;
};