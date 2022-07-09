const redis = require('redis')
// const client = redis.createClient()
const client = redis.createClient();  
// let client;

// (async () => {
//   client = redis.createClient();

//   client.on('error', (err) => console.log('Redis Client Error', err));

//   await client.connect();
  
// })();

const setJWT=  async (key,value)=>{
    
   return  new Promise( async (resolve,reject)=>{
     
    
    try {
        
       await client.set("key","value",(err,res)=>{
            if(err) reject(err)
            resolve(res)
        })
        
    } catch (error) {
        reject(error)
    }

   }) 
}
const getJWT=(key)=>{
   return new Promise((resolve,reject)=>{

    try {
        client.get("key",(err,res)=>{
            if(err) reject(err)
            resolve(res)
        })
        
    } catch (error) {
        reject(error)
    }

   })
}

module.exports={setJWT,getJWT}