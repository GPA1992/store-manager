const { BAD_REQUEST, INVALID_VALUE, NOT_FOUND } = require('../utils/errorMap');
const { salesModel } = require('../models/index');

async function productIdValidation(req, res, next) {
  const { body } = req;
  const ifProductIdExist = body.every((sale) => 'productId' in sale);
  if (!ifProductIdExist) {
    return res.status(BAD_REQUEST).json({
      message: '"productId" is required',
    });
  }
  return next();
}

function quantityValidation(req, res, next) {
const { body } = req;
  const quantityVerify = body.every((sale) => 'quantity' in sale);
  const quantityValueVerify = body.every((sale) => sale.quantity > 0);
  if (!quantityVerify) return res.status(BAD_REQUEST).json({ message: '"quantity" is required' });
  if (!quantityValueVerify) {
    return res.status(INVALID_VALUE).json({
      message: '"quantity" must be greater than or equal to 1',
    });
  }
  return next();
}

async function salesValitation(req, res, next) {
  const { id } = req.params;
  const salesById = await salesModel.salesById(id);
  if (salesById.length === 0) return res.status(NOT_FOUND).json({ message: 'Sale not found' });
  return next();
}

 module.exports = {
   productIdValidation,
   quantityValidation,
   salesValitation,
  };
