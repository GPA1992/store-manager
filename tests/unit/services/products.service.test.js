const { expect } = require('chai');
const { productServices } = require('../../../src/services')
const  validateProduct = require('../../../src/services/validations/products.validate')
const { productsModel } = require('../../../src/models')
const { allProducts, firstProduct, newProduct, editResult } = require('./mocks/product.services.mock')
const sinon = require('sinon');
const connection = require('../../../src/models/connection');



describe('Teste de unidade da camada model', function () {
  describe('Testando o service de produtos', function () {
    afterEach(sinon.restore);
    it('Testa a função getProducts, que deve retornar a lista de todos os produtos', async function () {
      // arrange
      sinon.stub(productsModel, 'getProducts').resolves(allProducts);
      // act
      const result = await productServices.getProducts()
      // assert
      expect(result.message).to.be.deep.equal(allProducts)
    });
    it('Testa a função getProductById, que deve retornar um produto pelo ID', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(firstProduct);
      // act
      const result = await productServices.getProductById(1)
      // assert
      expect(result.message).to.be.deep.equal(firstProduct)
    });
    it('Testa a função insertNewProduct, que deve inserir um novo produto', async function () {
      // arrange
      sinon.stub(productsModel, 'insertProduct').resolves(4);
      // act
      const result = await productServices.insertNewProduct(newProduct)
      // assert
      expect(result.message).to.be.deep.equal({ ...newProduct, id: 4 })
    });
    it('Testa a função editProduct, que deve editar um produto', async function () {
      sinon.stub(productsModel, 'editProductById').resolves(editResult)
      sinon.stub(productsModel, 'findById').resolves(firstProduct)

      const result = await productServices.editProduct(1, { "name": "Martelo do Batman" })
      expect(result.message.affectedRows).to.be.deep.equal(1)
    });
    it('Testa a função deleteProduct, que deve deletar um produto', function () {
      // arrange
      // act
      // assert
    });
    it(`Testa a função searchProduct, que deve procurar um produto pelo nome,
        ou letras que existem no nome`, function () {
      // arrange
      // act
      // assert
    });

  });
});
