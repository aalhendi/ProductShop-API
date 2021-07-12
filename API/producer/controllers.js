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
