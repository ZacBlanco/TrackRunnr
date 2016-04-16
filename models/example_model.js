var mongoose = require('mongoose');

var ExampleModel = new mongoose.Schema({
	numberField: Number,
	dateField: Date,
	stringField: String,
	complexUniqueField: {
		unique: true,
		type: String,
		required: true,	
	},
	complexData: {
		complexField1: String,
		complexField2: String,
	}
});

module.exports = mongoose.model('Example', ExampleModel);

