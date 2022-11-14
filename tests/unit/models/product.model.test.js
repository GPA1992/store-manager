const { expect } = require('chai');
const { productsModel } = require('../../../src/models')
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { allProducts } = require('./mocks/product.model.mock')


describe('Teste de unidade da camada model', function () {
  describe('Testando o model de produtos', function () {
    it('Testa a função getProducts que deve retornar todos os produsot', async function () {
      sinon.stub(connection, 'execute').resolves([allProducts]);
      const products = await productsModel.getProducts()
      expect(products).to.be.deep.equal(allProducts)
    })
  })
})
