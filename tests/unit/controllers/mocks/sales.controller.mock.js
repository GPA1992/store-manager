const saleItem = { "productId": 1, "quantity": 1 };
const allSales = [
  {
    "saleId": 1,
    "productId": 1,
    "quantity": 5,
    "date": "2022-11-26T14:19:02.000Z"
  },
  {
    "saleId": 1,
    "productId": 2,
    "quantity": 10,
    "date": "2022-11-26T14:19:02.000Z"
  },
  {
    "saleId": 2,
    "productId": 3,
    "quantity": 15,
    "date": "2022-11-26T14:19:02.000Z"
  },
  {
    "saleId": 3,
    "productId": 1,
    "quantity": 1,
    "date": "2022-11-26T14:35:30.000Z"
  },
  {
    "saleId": 3,
    "productId": 2,
    "quantity": 5,
    "date": "2022-11-26T14:35:30.000Z"
  },
  {
    "saleId": 4,
    "productId": 1,
    "quantity": 1,
    "date": "2022-11-26T14:38:26.000Z"
  },
  {
    "saleId": 4,
    "productId": 2,
    "quantity": 5,
    "date": "2022-11-26T14:38:26.000Z"
  },
  {
    "saleId": 5,
    "productId": 1,
    "quantity": 1,
    "date": "2022-11-26T14:39:13.000Z"
  },
  {
    "saleId": 5,
    "productId": 2,
    "quantity": 5,
    "date": "2022-11-26T14:39:13.000Z"
  }
];

const saleIdTwo = [
  {
    "productId": 3,
    "quantity": 15,
    "date": "2022-11-26T14:19:02.000Z"
  }
];

const saleToAtt = {
  "productId": 1,
  "quantity": 10
};

const saleToAdd = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const saleAddedResponse = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

const editResultFromInserSales = [{
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0
},
{
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0
}]
module.exports = {
  saleItem,
  allSales,
  saleIdTwo,
  saleToAtt,
  saleToAdd,
  saleAddedResponse,
  editResultFromInserSales,
};
