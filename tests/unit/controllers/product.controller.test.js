const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');
const { productsModel } = require('../../../src/models')
const { productServices } = require('../../../src/services')
const productsController = require('../../../src/controllers/products.controller')
const { allProducts, firstProduct, thorHamer, editedProduct, addedProduct } = require('./mocks/product.controller.mock')
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
     it('Testa a função listProducts, quando não existe uma lista de produtos', async function () {
      // arrange
     sinon
       .stub(connection, 'execute')
       .onFirstCall()
       .resolves([!allProducts]);
      // act
     const response = await chai
      .request(app)
      .get('/products').send()
      // assert
     expect(response.status).to.be.equal(404);
     expect(response.body).to.be.deep.equal('Não existe uma lista de produtos')
    });
    it('Testa a função getProduct, que deve retornar um produto pelo ID', async function () {
       // arrange
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

    it('Testa a função getProduct, quando é inserido um ID invalido', async function () {
       // arrange
      sinon
       .stub(connection, 'execute')
       .onFirstCall()
        .resolves([[!firstProduct]])
      .onSecondCall()
        .resolves([[{message: 'Product not found'}]])
      // act
     const response = await chai
      .request(app)
       .get('/products/888').send()
      // assert
     expect(response.status).to.be.equal(404);
     expect(response.body).to.be.deep.equal({ message: 'Product not found' })
    });

    it('Testa a função addProduct, que deve inserir um novo produto', async function () {
 // arrange
      sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([{ insertId: 4 }])
      .onSecondCall()
      .resolves(addedProduct)
      .onThirdCall()
        .resolves(addedProduct);

     const response = await chai
      .request(app)
       .post('/products').send({ name: 'ProdutoX' })

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(addedProduct)
    });

    it('Testa a função addProduct, quando não foi possivel inserir um produto novo', async function () {
 // arrange
      sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([{ insertId: false }])
      .onSecondCall()
      .resolves(!addedProduct)
      .onThirdCall()
        .resolves({ message: 'Não foi inserido um produto' });

     const response = await chai
      .request(app)
       .post('/products').send({ name: 'ProdutoX' })

      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: 'Não foi inserido um produto' })
    });

    it('Testa a função changedProductById, que deve editar um produto', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(firstProduct)

      sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([{ affectedRows: 1 }])
      .onSecondCall()
      .resolves(editedProduct)
      .onThirdCall()
        .resolves(editedProduct)

      // act/*  */
      const response = await chai
      .request(app)
       .put('/products/4').send({ name: 'Corsa Azul' })

      // assert
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(editedProduct)

    });

    it('Testa a função changedProductById, quando não foi possivel editar um produto', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(!firstProduct)

      // act/*  */
      const response = await chai
      .request(app)
        .put('/products/888').send({ name: "ALOHA" })

      // assert
      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: "Product not found" })

    });
    it('Testa a função deleteProduct, que deve deletar um produto', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(firstProduct)
      sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([{ affectedRows: 1 }])
      .onSecondCall()
      .resolves(editedProduct)
      .onThirdCall()
        .resolves(editedProduct)
      // act
      const response = await chai
      .request(app)
       .delete('/products/4').send()
      // assert
      expect(response.status).to.be.equal(204);
      expect(response.body).to.be.deep.equal({})
    });
    it('Testa a função deleteProduct, quando não foi possivel deletar um produto', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(!firstProduct)

      // act
      const response = await chai
      .request(app)
       .delete('/products/4').send()
      // assert
      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: "Product not found" })
    });
     it(`Testa a função searchProductByname, que deve procurar um produto pelo nome,
        ou letras que existem no nome`, async function () {
      // arrange
       sinon
       .stub(connection, 'execute')
       .onFirstCall()
       .resolves([thorHamer]);
      // act
     const response = await chai
      .request(app)
       .get('/products/search').query({ q: 'Martelo' })
      // assert
     expect(response.status).to.be.equal(200);
     expect(response.body).to.be.deep.equal(thorHamer)
    });
  });
});
