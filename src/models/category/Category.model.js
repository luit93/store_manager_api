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
            CategorySchema.findOne({_id})
            .then((data)=>resolve(data))
            .catch((error)=>reject(error))
        } catch (error) {
            reject(error)
        }
    })
}
//update category in mongo
const updateCategory=({_id,name,parent,img,status})=>{
    return new Promise((resolve,reject)=>{
        try {
            CategorySchema
            .findOneAndUpdate({_id},{name,parent,img,status},{new:true})
            .then((data)=>resolve(data))
            .catch((error)=>reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

//delete single category
const deleteCategory=(_id)=>{
    return new Promise((resolve,reject)=>{
        try {
            CategorySchema.findOneAndDelete({_id})
            .then((data)=>resolve(data))
            .catch((error)=>reject(error))
        } catch (error) {
            reject(error)
        }
    })
}
module.exports=({
    createCategory,getCategories,getCategory,updateCategory,deleteCategory
})