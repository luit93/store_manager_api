const {CategorySchema} = require('./Category.schema')

//create category and insert in mongo
const createCategory=(newCat)=>{
    return new Promise((resolve,reject)=>{
        try {
            CategorySchema(newCat)
            .save()
            .then((data)=>resolve(data))
            .catch((error)=>reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

module.exports=({
    createCategory
})