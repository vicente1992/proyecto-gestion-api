const { validateMachine } = require("../utils/validateMachine");

const machineHashMiddleware = (req, res, next) => {
  try {

    const hash = req.headers['x-hash'];
    const userId = req.headers['x-user-id'];
    const token = validateMachine(userId);
    if (token === hash) {
      next();
    } else {
      res.status(403);
      res.send({ error: "API_KEY_NO_ES_CORRECTA" });
    }
  } catch (e) {
    res.status(403);
    res.send({ error: "ALGO_OCURRIO_EN_EL_CUSTOM_HEADER" });
  }
};

module.exports = machineHashMiddleware;