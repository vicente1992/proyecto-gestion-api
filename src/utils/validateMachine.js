const { Buffer } = require("buffer");
const KEY_MACHINE = process.env.KEY_MACHINE ?? ''

/**
 * 
 * @param {*} id 
 * @returns 
 */
const validateMachine = (id = '') => {
  const token = `${id}:${KEY_MACHINE}`;
  const result = Buffer.from(token).toString("base64");
  return result
};

module.exports = { validateMachine };
