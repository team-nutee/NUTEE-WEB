module.exports = (sequelize,DataTypes)=>{
    const Chatting = sequelize.define('Chatting',{
        user:{
            type:DataTypes.STRING(15),
            allowNull:false,
        },
        chat:DataTypes.STRING(1000),
        gif:DataTypes.STRING(1000),
        createdAt:{
            type:DataTypes.STRING(20),
        },
    });
    return Chatting;
}
