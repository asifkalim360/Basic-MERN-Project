const mongoose = require('mongoose');   // include mongosse librarry for database fetch

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String 
});  //database me jb fields ko add,update,delete,edit karna hotahotahai tb schema define karna hota hai.agr humlog data ko sirf fetch karn ahai to schema ko blank chd denge.

module.exports = mongoose.model("users",userSchema)