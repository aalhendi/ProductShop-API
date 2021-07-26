/* Models */
const { Order, OrderItem } = require("../../db/models");

exports.checkout = async (req, res, next) => {
  try {
    const newOrder = await Order.create({ userId: req.user.id });
    const cartContents = req.body.map((item) => ({
      ...item,
      orderId: newOrder.id,
    }));
    const newOrderItems = await OrderItem.bulkCreate(cartContents);
    res.status(201).json(newOrderItems);
  } catch (error) {
    next(error);
  }
};
