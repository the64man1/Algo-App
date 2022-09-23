const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    category: String,
    problems: [String]
})

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;