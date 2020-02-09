module.exports = (sequelize,DataTypes)=>(
    sequelize.define('otp',{
        hash:{
            type:DataTypes.STRING(150),
            allowNull:false,
            unique:true,
        }
    })
);