import bcrypt from 'bcrypt-nodejs';
import sequelizePaginate from 'sequelize-paginate';

const SALT_WORK_FACTOR = 256;

// Exception name heavily inspired my django.
const UserDoesNotExist = new Error('User does not exist')

const user = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        trim: true,
        allowNull: false
      },
      isSuperUser:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      role: {
        type: DataTypes.ENUM,
        values: ['admin', 'superuser']
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
      },
      password: DataTypes.STRING,
      phoneNumber: {
        type: DataTypes.STRING,
        unique: true
      },
      isEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },{
      hooks: {
        beforeCreate: hashPasswordIfChanged,
        beforeUpdate: hashPasswordIfChanged
      }
    })

    // association
    User.associate = (models) => {
    };

    // instance methods
    User.prototype.toJSON =  function () {
      // We override toJSON not to expose user password
      let values = Object.assign({}, this.get());
    
      delete values.password;
      return values;
    }

    User.prototype.validPassword = function(password){
      return bcrypt.compareSync(password, this.password);
      }

    // class methods
    User.getByPk = async function(id){
      // Much like User.findByPk except this
      // throws error if user doesn't exist.
      // Bare this win mind on usage.
      const user = await this.findByPk(id)
      if (!user){
        throw UserDoesNotExist
      }
      return user;
    }
    // paginate
    sequelizePaginate.paginate(User)
    return User;
  }

  function hashPasswordIfChanged(user, options){
    const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR)
      if (user.changed('password')){
        user.password = bcrypt.hashSync(user.password, salt);
    }
  }
  
  export default user;