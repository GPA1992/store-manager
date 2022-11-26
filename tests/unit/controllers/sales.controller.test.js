const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
const { salesModel, productsModel } = require('../../../src/models/')
const { salesService } = require('../../../src/services')
const salesController = require('../../../src/controllers/sales.controller')
const { saleAddedResponse, saleToAdd, editResultFromInserSales } = require('./mocks/sales.controller.mock')
const { allProducts } = require('./mocks/product.controller.mock')
const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const app = require('../../../src/app');

const connection = require('../../../src/models/connection');


describe('Teste de unidade da camada services', function () {
  describe('Testando o controller do sales', function () {
    afterEach(sinon.restore);
    it('Testa a função addNewSale que deve adicionar uma nova sale', async function () {
      // arrange

      sinon.stub(productsModel, 'getProducts').resolves([allProducts])
      sinon.stub(salesModel, 'actualSaleId').resolves({ insertId: 3 })
      sinon.stub(salesModel, 'insertSale').resolves([editResultFromInserSales])



      /* sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([ [ { affectedRows: 1 } ], [ { affectedRows: 1 } ] ])
      .onSecondCall()
      .resolves([{ insertId: 3 }])
      .onThirdCall()
        .resolves([[saleAddedResponse]]) */

      // act
     const response = await chai
      .request(app)
       .post('/sales').send(saleToAdd)

     expect(response.status).to.be.equal(200);
     expect(response.body).to.be.deep.equal(saleAddedResponse)
    })
  });
});
