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
       slug: {
        type: String,
        required: false,
        default: '',
        maxLength: 30,
        // unique: true,
        index: 1,
      },
      parent:{
        type: mongoose.Schema.Types.ObjectId, default:null
      }

},{timestamps:true})

module.exports = {
    CategorySchema: mongoose.model("Category", CategorySchema),
  };
  