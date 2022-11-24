const allProducts = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
]

const firstProduct = {
  "id": 1,
  "name": "Martelo de Thor"
};

const newProduct = { "name": "XABLAU" }

const editResult = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 1  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 1
}

const addedProduct = { "name": "ProdutoX", "id": 4 };
const editedProduct = { "name": "Corsa Azul", "id": '4' };

module.exports = {
  allProducts,
  firstProduct,
  newProduct,
  editResult,
  addedProduct,
  editedProduct,
};
