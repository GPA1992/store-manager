const { expect } = require('chai');
const { salesService } = require('../../../src/services')
const  validateProduct = require('../../../src/services/validations/products.validate')
const { salesModel } = require('../../../src/models')
const { allProducts, firstProduct, newProduct, editResult } = require('./mocks/product.services.mock')
const sinon = require('sinon');
const connection = require('../../../src/models/connection');


describe('Teste de unidade da camada services', function () {
  describe('Testando o service de sales', function () {
    afterEach(function () {
     sinon.restore();
   });


  });
});
