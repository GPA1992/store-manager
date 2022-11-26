const { expect } = require('chai');
const { salesService } = require('../../../src/services')
const { salesModel } = require('../../../src/models')
const { newSaleToAdd, saleToAtt } = require('./mocks/sales.service.mock')
const sinon = require('sinon');
const { allSales, saleIdTwo } = require('../models/mocks/sales.model.mock');


describe('Teste de unidade da camada services', function () {
  describe('Testando o service de sales', function () {
    afterEach(function () {
     sinon.restore();
   });
    it('Testa a função newSale, que deve inserir uma nova venda', async function () {
    // arrange
    sinon.stub(salesModel, 'actualSaleId').resolves(4);
    sinon.stub(salesModel, 'insertSale').resolves([{ affectedRows: 1 }]);
    // act
    const result = await salesService.newSale(newSaleToAdd)
    // assert
    expect(result.message).to.be.deep.equal({ id: 4, itemsSold: newSaleToAdd })
    })
    it('Testa a função salesList, retornar todas as sales', async function () {
    // arrange
    sinon.stub(salesModel, 'getSales').resolves(allSales);
    // act
    const result = await salesService.salesList()
    // assert
    expect(result.message).to.be.deep.equal(allSales)
    })
    it('Testa a função salesListById, que deve retornar uma sale pelo ID', async function () {
    // arrange
    sinon.stub(salesModel, 'salesById').resolves(saleIdTwo);
    // act
    const result = await salesService.salesListById(2)
    // assert
    expect(result.message).to.be.deep.equal(saleIdTwo)
    })
    it('Testa a função deleteSale, que deve deletar uma sale pelo ID', async function () {
    // arrange
      sinon.stub(salesModel, 'salesById').resolves(saleIdTwo);
      sinon.stub(salesModel, 'deleteSaleById').resolves([{ affectedRows: 1 }]);
    // act
    const result = await salesService.deleteSale(2)
    // assert
    expect(result.message).to.be.deep.equal({})
    })
    it('Testa a função attSale, que deve atualizar uma sale pelo ID', async function () {
    // arrange
    sinon.stub(salesModel, 'salesById').resolves(true);
    sinon.stub(salesModel, 'attSale').resolves([{ affectedRows: 1 }]);
    // act
    const result = await salesService.attSale(saleToAtt, 2)

    // assert
    expect(result.message).to.be.deep.equal({ saleId: 2, itemsUpdated: saleToAtt})
    })

  });
});
