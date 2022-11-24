const { expect } = require('chai');
const { productServices } = require('../../../src/services')
const  validateProduct = require('../../../src/services/validations/products.validate')
const { productsModel } = require('../../../src/models')
const { allProducts, firstProduct, newProduct, editResult } = require('./mocks/product.services.mock')
const sinon = require('sinon');
const connection = require('../../../src/models/connection');



describe('Teste de unidade da camada services', function () {
  describe('Testando o service de produtos', function () {
    afterEach(function () {
     sinon.restore();
   });
    it('Testa a função getProducts, que deve retornar a lista de todos os produtos', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([allProducts]);
      sinon.stub(productsModel, 'getProducts').resolves(allProducts);
      // act
      const result = await productServices.getProducts()
      // assert
      expect(result.message).to.be.deep.equal(allProducts)
    });
    // NÃO COBRE
    it('Testa a função getProductById, que deve retornar um produto pelo ID', async function () {
      // arrange
      sinon.stub(validateProduct, 'validateProductId').resolves({ type: null, message: '' });
      sinon.stub(productsModel, 'findById').resolves(firstProduct);

      // act
      const validate = await validateProduct.validateProductId(1);
      expect(validate.message).to.be.deep.equal('')

      const result = await productServices.getProductById(1);
      // assert
      expect(result.message).to.be.deep.equal(firstProduct)
    });
    it('Testa a função getProductById, ao inserir um id errado', async function () {
      // arrange
      sinon.stub(validateProduct, 'validateProductId').resolves({ type: true, message: 'Product not found' });
      sinon.stub(productsModel, 'findById').resolves(!firstProduct);

      // act
      const validate = await validateProduct.validateProductId(888);
      expect(validate.message).to.be.deep.equal('Product not found')

      const result = await productServices.getProductById(888);
      // assert
      expect(result.message).to.be.deep.equal('Product not found')
    });

    // COBRE AS LINHAS
    it('Testa a função insertNewProduct, que deve inserir um novo produto', async function () {
      // arrange
      sinon.stub(productsModel, 'insertProduct').resolves(4);
      // act
      const result = await productServices.insertNewProduct(newProduct)
      // assert
      expect(result.message).to.be.deep.equal({ ...newProduct, id: 4 })
    });
    it('Testa a função editProduct, que deve editar um produto', async function () {
      // arrange
      sinon.stub(productsModel, 'editProductById').resolves(editResult)
      sinon.stub(productsModel, 'findById').resolves(firstProduct)
      // act
      const result = await productServices.editProduct(1, { "name": "Martelo do Batman" })
      // assert
      expect(result.message.affectedRows).to.be.deep.equal(1)
    });
    it('Testa a função editProduct, ao inserir um ID errado', async function () {
      // arrange
      sinon.stub(validateProduct, 'validateProductId').resolves({ type: true, message: 'Product not found' });
      sinon.stub(productsModel, 'findById').resolves(!firstProduct);
      // act
      const validate = await validateProduct.validateProductId(888);
      expect(validate.message).to.be.deep.equal('Product not found')
      const result = await productServices.editProduct(888, { "name": "Martelo do Batman" })
      // assert
      expect(result.message).to.be.deep.equal('Product not found')
    });
    it('Testa a função deleteProduct, que deve deletar um produto', async function () {
      // arrange
      sinon.stub(productsModel, 'deleteProductById').resolves(editResult)
      sinon.stub(productsModel, 'findById').resolves(firstProduct)
      // act
      const result = await productServices.deleteProduct(1)
      // assert
      expect(result.message.affectedRows).to.be.deep.equal(1)
    });
     it('Testa a função deleteProduct, ao inserir um ID errado', async function () {
      // arrange
     sinon.stub(validateProduct, 'validateProductId').resolves({ type: true, message: 'Product not found' });
      sinon.stub(productsModel, 'findById').resolves(!firstProduct);
      // act
      const validate = await validateProduct.validateProductId(888);
      expect(validate.message).to.be.deep.equal('Product not found')
      const result = await productServices.deleteProduct(1)
      // assert
      expect(result.message).to.be.deep.equal('Product not found')
    });
    it(`Testa a função searchProduct, que deve procurar um produto pelo nome,
        ou letras que existem no nome`, async function () {
      // arrange
      sinon.stub(productsModel, 'getProducts').resolves(allProducts);
      // act
      const result = await productServices.searchProduct('Martelo')
      // assert
      expect(result.message).to.be.deep.equal([firstProduct])
    });

  });
});


