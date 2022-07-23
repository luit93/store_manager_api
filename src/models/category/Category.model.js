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
//get categories
const getCategories=()=>{
    return new Promise((resolve,reject)=>{
        try {
            CategorySchema.find()
            .then((data)=>resolve(data))
            .catch((error)=>reject(error))
        } catch (error) {
            reject(error)
        }
    })
}
//get single category
const getCategory=(_id)=>{
    return new Promise((resolve,reject)=>{
        try {
            CategorySchema.find({_id})
            .then((data)=>resolve(data))
            .catch((error)=>reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

module.exports=({
    createCategory,getCategories,getCategory
})