const mongoose = require('mongoose')
const validator = require('validator')

const catagorySchema = mongoose.Schema({
    name:{
        type: String,
        trim : true,
        required:[true, "Please provide a catagory name"],
        lowercase:true,
        unique: true,
    },
    decription: String,
    imageUrl:{
        type: String,
        validate:[validator.isURL, "please provide a valid URL"]
    }
},{
    timestamps: true
})

const Category = mongoose.model("Category", catagorySchema)
module.exports= Category;