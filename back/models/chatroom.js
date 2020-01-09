module.exports = (sequelize,DataTypes)=>{
    const Chatroom = sequelize.define('Chatroom',{
        roomNumber:{
            type:DataTypes.INTEGER,
            primaryKey:true, // ai 설정으로 primaryKey
            autoIncrement: true,
        },
        title:{
            type:DataTypes.STRING(20),
            allowNull: false,
        },
        max:{
            type:DataTypes.INTEGER,
            default:10,
            min:2,
            allowNull:false,
        },
        owner:{
            type:DataTypes.STRING(15),
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING(30),
        }
    });
    Chatroom.associate = (db)=>{
        db.Chatroom.hasMany(db.Chatting, {foreignKey:'roomNumber'});

    };
    return Chatroom;
};