var bcrypt = require("bcrypt");
var salt = 10;

const hashPassword = async (password) => {
  // console.log("plain pass from hashpass()", password);
  return await new Promise((resolve,reject) => {
    
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        reject(err);
      }
      // console.log("hashed iside scope", hash);
      resolve(hash) 
    }
    );
  });
};


const comparePassword = (plainPassword, passwordFromDb) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, passwordFromDb, function (err, result) {
      if (err) {
        // console.log('compare fali')
        reject(err);
        
      }
      // console.log('compare pas',result)
      resolve(result);
    });
  });
};
module.exports = {
  hashPassword,
  comparePassword,
};
