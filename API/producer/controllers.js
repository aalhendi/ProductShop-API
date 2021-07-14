const { Producer, Product } = require("../../db/models");

exports.fetchProducer = async (producerId, next) => {
  try {
    const producer = await Producer.findByPk(producerId);
    return producer;
  } catch (error) {
    next(error);
  }
};

exports.producerFetch = async (req, res, next) => {
  try {
    const producers = await Producer.findAll({
      include: {
        model: Product,
        as: "products",
        attributes: ["id"],
      },
    });
    res.json(producers);
  } catch (error) {
    next(error);
  }
};

exports.producerFind = async (req, res, next) => {
  try {
    res.json(req.producer);
  } catch (error) {
    next(error);
  }
};

exports.producerCreate = async (req, res, next) => {
  try {
    /* Check if user already has a producer */
    const foundProducer = await Producer.findOne({
      where: { userId: req.user.id },
    });
    if (foundProducer) {
      /* Prevent user from creating two producers */
      const error = new Error("User already has a Producer.");
      error.status = 400;
      return next(error);
    }
    if (req.file) {
      req.body.image = `http://${req.get("host")}/${req.file.path}`;
    }
    const newProducer = await Producer.create(req.body);
    res.status(201).json(newProducer); // 201 - Created
  } catch (error) {
    next(error);
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    /* The user adding the product must be the producer */
    if (req.user.id !== req.producer.userId) {
      const error = new Error("Unauthorized.");
      error.status = 400;
      return next(error);
    }
    if (req.file) {
      req.body.image = `http://${req.get("host")}/${req.file.path}`;
    }
    req.body.producerId = req.producer.id;
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct); // 201 - Created
  } catch (error) {
    next(error);
  }
};
