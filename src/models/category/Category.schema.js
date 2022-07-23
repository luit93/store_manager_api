const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name:{
        type:String, maxLength:50, required:true
    },
    status: {
        type: String,
        required: false,
        default: 'active',
      },  
     
      img:{type:Array},
      parent:{
        type: mongoose.Schema.Types.ObjectId
      }

},{timestamps:true})

module.exports = {
    CategorySchema: mongoose.model("Category", CategorySchema),
  };
  


//   slug: {
//     type: String,
//     required: false,
//     default: '',
//     maxLength: 30,
//     unique: true,
//     index: 1,
//   },