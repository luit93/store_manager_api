const { randomPinGenerator } = require("../../utils/randomPinGen");
const { ResetPinSchema } = require("./ResetPin.schema");

const setResetPin = async(email) => {
  //create random 6 digit pin
  pinLength=6
  const randomPin= await randomPinGenerator(pinLength)
  const resetObj = {
    email,
    pin: randomPin
  }
  return new Promise((resolve, reject) => {
    ResetPinSchema(resetObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

module.exports = {
  setResetPin,

};
