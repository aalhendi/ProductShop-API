const SequlizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required",
        },
      },
    },
    slug: { type: DataTypes.STRING, unique: true },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
      defaultValue: 2,
    },
    description: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
  });
  SequlizeSlugify.slugifyModel(Product, { source: ["name"] });
  return Product;
};
