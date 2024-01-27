import Order from "../Models/Order.js";

const createOrder = async (req, res) => {
  try {
    const { cartId, shippingInfo, payment } = req.body;

    const newOrder = new Order({
      order: { cartId },
      shippingInfo,
      payment,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { createOrder };
