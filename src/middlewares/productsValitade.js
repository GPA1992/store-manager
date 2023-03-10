const { BAD_REQUEST } = require('../utils/errorMap');

function productNameValidation(req, res, next) {
const { name } = req.body;
    if (!name) {
       return res.status(BAD_REQUEST).json({ message: '"name" is required' });
    }
    if (name.length < 5) {
        return res.status(422).json({
            message: '"name" length must be at least 5 characters long',
        });
    }

    return next();
}

  module.exports = {
    productNameValidation,
  };
