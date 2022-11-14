const { salesModel } = require('../models');

const newSale = async (sale) => {
  const newSale = await salesModel.insertSale(sale);
}
