const mongoose = require('mongoose');   // include mongosse librarry for database fetch

const productSchema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String,

});  //database me jb fields ko add,update,delete,edit karna hotahotahai tb schema define karna hota hai.agr humlog data ko sirf fetch karn ahai to schema ko blank chd denge.

module.exports = mongoose.model("products",productSchema)