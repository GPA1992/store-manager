const { expect } = require('chai');
const { productsModel } = require('../../../src/models')
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { allProducts, newProduct } = require('./mocks/product.model.mock')


describe('Teste de unidade da camada model', function () {
  describe('Testando o model de produtos', function () {
    afterEach(sinon.restore);
    it('Testa a função getProducts que deve retornar todos os produto', async function () {
      sinon.stub(connection, 'execute').resolves([allProducts]);
      const products = await productsModel.getProducts()
      expect(products).to.be.deep.equal(allProducts)
    })
    it('Testa a função findById que deve retornar apenas um produto', async function () {
      sinon.stub(connection, 'execute').resolves([allProducts]);
      const product = await productsModel.findById(1)
      expect(product).to.be.deep.equal(allProducts[0])
    })
    it('Testa a função InsertProduct, que insere um produto na DB', async function() {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }])

      const result = await productsModel.insertProduct(newProduct)
      expect(result).to.be.deep.equal(4)
    })
    it('Testa a função editProductById, que edita um produto na DB', async function() {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }])
      const result = await productsModel.editProductById(1, 'martelo do batman')
      expect(result.affectedRows).to.be.deep.equal(1)
    })
    it('Testa a função deleteProductById, que deleta um produto na DB', async function() {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }])
      const result = await productsModel.deleteProductById(1)
      expect(result.affectedRows).to.be.deep.equal(1)
    })
  })
})
