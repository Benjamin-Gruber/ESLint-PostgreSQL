const errorHandler = (err, req, res, next) => {
  console.log('Error ====> ', err.message.red.inverse);
  res.status(500).json({
    code: 500,
    data: 'Server error!!!',
  });
};

const notFound = (req, res) => {
  console.log('Not found ====> ', req.originalUrl.blue);
  res.status(404).json({
    code: 404,
    data: 'The requested resource could not be found on this sever',
  });
};

module.exports = { errorHandler, notFound };
