const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
    name: String,
    description: String,
    pseudocode: String,
    inputs: Number,
    info: String,
    samples: [Object]
});

const Problem = mongoose.model("Problem", ProblemSchema);

module.exports = Problem;