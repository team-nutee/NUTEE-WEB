module.exports = (sequelize,DataTypes)=>{
    const Recommendation = sequelize.define('Recommendation',{
        userId:{
            type:DataTypes.STRING(20),
            allowNull:false,
        }
    })
    return Recommendation;
};
