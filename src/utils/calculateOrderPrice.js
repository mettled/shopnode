const calculateOrderPrice = (order) => {
  return order.reduce((acc, { courseId: { price = 0 }, count }) => acc + price * count, 0);
};

export default calculateOrderPrice;
