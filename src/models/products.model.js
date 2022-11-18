const connection = require('./connection');

const getProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return result;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id',
    [productId],
  );
  return result;
};

const insertProduct = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [product.name],
  );
  return insertId;
};

const editProductById = async (productId, newProductName) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [newProductName, productId],
  );
  return result;
};

const deleteProductById = async (productId) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?', [productId],
  );
  return result;
};

  module.exports = {
    getProducts,
    findById,
    insertProduct,
    editProductById,
    deleteProductById,
  };
