const SequlizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Producer = sequelize.define("Producer", {
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
    image: { type: DataTypes.STRING },
  });
  SequlizeSlugify.slugifyModel(Producer, { source: ["name"] });
  return Producer;
};
