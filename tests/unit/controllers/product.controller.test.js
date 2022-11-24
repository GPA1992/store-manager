const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
const { productsModel } = require('../../../src/models')
const { allProducts, firstProduct, newProduct, editResult } = require('./mocks/product.controller.mock')
const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);


const app = require('../../../src/app');


const connection = require('../../../src/models/connection');


describe('Teste de unidade da camada services', function () {
  describe('Testando o controller de produtos', function () {
    afterEach(sinon.restore);
   it('Testa a função listProducts, que deve retornar a lista de todos os produtos', async function () {
      // arrange
     sinon
       .stub(connection, 'execute')
       .onFirstCall()
       .resolves([allProducts]);

      // act
     const response = await chai
      .request(app)
      .get('/products').send()

      // assert
     expect(response.status).to.be.equal(200);
     expect(response.body).to.be.deep.equal(allProducts)
    });
    it('Testa a função getProduct, que deve retornar um produto pelo ID', async function () {
      sinon
       .stub(connection, 'execute')
       .onFirstCall()
        .resolves([[firstProduct]])
      .onSecondCall()
        .resolves([[firstProduct]])
      // act
     const response = await chai
      .request(app)
      .get('/products/1').send()
      // assert
     expect(response.status).to.be.equal(200);
     expect(response.body).to.be.deep.equal(firstProduct)
    });
    /* it('Testa a função addProduct, que deve inserir um novo produto', async function () {
      // arrange
      // act
      // assert
    }); */
    /* it('Testa a função changedProductById, que deve editar um produto', async function () {
      // arrange
      // act
      // assert
    }); */
    /* it('Testa a função deleteProduct, que deve deletar um produto', async function () {
      // arrange
      // act
      // assert
    }); */
    /* it(`Testa a função searchProductByname, que deve procurar um produto pelo nome,
        ou letras que existem no nome`, async function () {
      // arrange
      // act
      // assert
    }); */

  });
});
