module.exports = (sequelize,DataTypes) => {
    const Report = sequelize.define('Report', {
        content:{
            type: DataTypes.TEXT, //신고 사유
            allowNull: false,
        },
    }, {
        charset :'utf8mb4',
        collate : 'utf8mb4_general_ci',
    });

    Report.associate = (db) => {
        db.Report.belongsTo(db.Post);
        db.Report.belongsTo(db.User);
    };
    return Report;
};