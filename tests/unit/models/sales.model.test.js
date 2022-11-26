const { expect } = require('chai');
const { salesModel } = require('../../../src/models')
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { saleItem, allSales, saleIdTwo, saleToAtt } = require('./mocks/sales.model.mock')


describe('Teste de unidade da camada model', function () {
  describe('Testando o model de sales', function () {
    afterEach(sinon.restore);
    it('Testa a função actualSaleId, que deve retornar o ID atual', async function () {
      //arrange
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

      //act
      const result = await salesModel.actualSaleId()
      //assert
      expect(result).to.be.deep.equal(4)
    })
    it('Testa a função insetSale, que deve inserir uma nova venda', async function () {
      //arrange
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1, }]);

      //act
      const result = await salesModel.insertSale(saleItem, 5)
      //assert
      expect(result.affectedRows).to.be.deep.equal(1)
    })
    it('Testa a função getSales, retornar todas as sales', async function () {
     // arrange
     sinon.stub(connection, 'execute').resolves([allSales]);

     //act
      const result = await salesModel.getSales()

     //assert
     expect(result).to.be.deep.equal(allSales)
    })
    it('Testa a função salesById, que deve retornar uma sale pelo ID', async function () {
     // arrange
     sinon.stub(connection, 'execute').resolves([saleIdTwo]);

     //act
      const result = await salesModel.salesById(2)

     //assert
     expect(result).to.be.deep.equal(saleIdTwo)
    })
    it('Testa a função deleteSaleById, que deve deletar uma sale pelo ID', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    //act
    const result = await salesModel.deleteSaleById(2)

    //assert
    expect(result.affectedRows).to.be.deep.equal(1)
    })

    it('Testa a função attSale, que deve atualizar uma sale pelo ID', async function () {
    // arrange
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    //act

    const result = await salesModel.attSale(saleToAtt, 2)

    //assert
    expect(result.affectedRows).to.be.deep.equal(1)
    })
  })
})
