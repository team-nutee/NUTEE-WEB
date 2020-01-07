module.exports = (sequelize,DataTypes)=>{
    const Chatroom = sequelize.define('Chatroom',{
        roomNumber:{
            type:DataTypes.UNSIGNED,
            allowNull:false,
            autoIncrement: true,
        },
        title:{
            type:DataTypes.STRING(20),
            allowNull: false,
        },
        max:{
            type:DataTypes.UNSIGNED,
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
        },
        createdAt:{
            type:DataTypes.Date,
            default:Date.now(),
        }
    });
    Chatroom.associate = (db)=>{
        db.Chatroom.hasMany(db.Chatting, {foreignKey:'roomNumber'});
        db.Chatting.hasOne(db.Chatroom);
    };
    return Chatroom;
};