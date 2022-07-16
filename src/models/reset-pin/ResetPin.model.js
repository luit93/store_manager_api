const { randomPinGenerator } = require("../../utils/randomPinGen");
const { ResetPinSchema } = require("./ResetPin.schema");

const setResetPin = async (email) => {
  //create random 6 digit pin
  pinLength = 6;
  const randomPin = await randomPinGenerator(pinLength);
  const resetObj = {
    email,
    pin: randomPin,
  };
  return new Promise((resolve, reject) => {
    ResetPinSchema(resetObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getPinFromDb = (email, pin) => {
  return new Promise((resolve, reject) => {
    try {
      ResetPinSchema.findOne({ email, pin }, (error, data) => {
        if (error) {
          resolve(error);
        }
        resolve(data);
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const deletePin = (email, pin) => {
  try {
    ResetPinSchema.findOneAndDelete({ email, pin }, (error, data) => {
      if (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  setResetPin,
  getPinFromDb,
  deletePin,
};
