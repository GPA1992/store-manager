const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const insertSale = async (sale, saleId) => {
  
    const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (productId, quantity) VALUE (?, ?)',
      [sale.productId, sale.quantity],
    );
    return insertId;
};

  module.exports = {
    insertSale,
  };
