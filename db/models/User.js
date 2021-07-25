module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "username is already in-use",
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Usename is required",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "email is already in-use",
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "email is required",
        },
        isEmail: {
          args: true,
          msg: "email must be valid",
        },
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "First name is required",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Last name is required",
        },
      },
    },
  });
  return User;
};
