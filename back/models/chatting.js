module.exports = (sequelize,DataTypes)=>{
    const Chatting = sequelize.define('Chatting',{
        user:{
            type:DataTypes.STRING(15),
            allowNull:false,
        },
        chat:DataTypes.String(1000),
        gif:DataTypes.String(1000),
        createdAt:{
            type:DataTypes.String(20),
        },
    });
    return Chatting;
}
