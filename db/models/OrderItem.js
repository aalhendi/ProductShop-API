module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define("OrderItem", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: "Minimum quantity cannot be less than 1",
        },
        notEmpty: {
          args: true,
          msg: "Quantity is required",
        },
      },
    },
  });
  return OrderItem;
};
