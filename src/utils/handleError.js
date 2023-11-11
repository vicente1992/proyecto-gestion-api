const { response } = require("express");

const handleHttpError = (res = response, message = "Algo sucedio", code = 403) => {
  res.status(code);
  res.send({ error: message, status: code });
};

module.exports = { handleHttpError };