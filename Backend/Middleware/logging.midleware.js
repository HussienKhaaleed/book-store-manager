const customLogger = (req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(body) {
    console.log(`${req.method} ${req.path} ${res.statusCode}`);
    originalSend.call(this, body);
  };
  
  next();
};

module.exports = customLogger;