/* const camelize = require('camelize'); */
const snakeize = require('snakeize');
const connection = require('./connection');

const actualSaleId = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );
  return insertId;
};

const insertSale = async (sale, id) => {
  const columns = Object.keys(snakeize(sale))
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(sale)
    .map((_key) => '?')
    .join(', ');

    const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (${columns}, sale_id) VALUES (${placeholders}, ?)`,
      [...Object.values(sale), id],
    );
    return insertId;
};

  module.exports = {
    insertSale,
    actualSaleId,
  };
