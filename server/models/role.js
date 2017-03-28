export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'This Role has been taken'
      },
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty'
        }
      }
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Role.hasMany(models.User, {
          foreignKey: 'roleId'
        });
      }
    }
  });
  return Role;
};