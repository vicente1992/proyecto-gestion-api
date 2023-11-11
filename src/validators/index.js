const { loginValidator } = require('./login');
const { registerValidator } = require('./register');
const { machineValidator } = require('./machine');


module.exports = {
  loginValidator,
  registerValidator,
  machineValidator
}