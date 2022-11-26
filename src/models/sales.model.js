const camelize = require('camelize');
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

    const [result] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (${columns}, sale_id) VALUES (${placeholders}, ?)`,
      [...Object.values(sale), id],
    );
    return result;
};

const getSales = async () => {
  const [result] = await connection.execute(`
    SELECT vendas_produtos.*, vendas.date
    FROM
    StoreManager.sales_products AS vendas_produtos
    INNER JOIN
    StoreManager.sales AS vendas ON vendas_produtos.sale_id = vendas.id
    ORDER BY
    vendas_produtos.sale_id, vendas_produtos.product_id;`);

  return camelize(result);
};

const salesById = async (id) => {
  const [result] = await connection.execute(`
    SELECT vendas_produtos.product_id, vendas_produtos.quantity ,vendas.date
    FROM
    StoreManager.sales_products AS vendas_produtos
    INNER JOIN
    StoreManager.sales AS vendas
    ON
    vendas_produtos.sale_id = vendas.id
    WHERE
    vendas.id = ?
    ORDER BY
    vendas_produtos.sale_id, vendas_produtos.product_id;`, [id]);
  return camelize(result);
};

const deleteSaleById = async (saleId) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?', [saleId],
  );
  return result;
};

const attSale = async (sale, saleId) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
      [sale.quantity, saleId, sale.productId],
  );
    return result;
};
module.exports = {
    salesById,
    getSales,
    insertSale,
    actualSaleId,
    deleteSaleById,
    attSale,
  };
