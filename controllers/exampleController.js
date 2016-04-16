var Model = require('../models/example_model');

exports.getExample = function(req, res) {
	Model.find(function(err, allExamples) {
		if(err) {
			res.send(err);
		}
		
		//Do some processing here
		// See the below URL for docs
		// http://mongoosejs.com/docs/models.html
		
		res.json(examples)
	});
	
};

exports.postExample = function(req, res) {
	var model = new Model();
	
	model.name = req.body.name;
	model.type = req.body.type;
	model.userID = req.body.userID;
	
	model.save(function(err) {
		if(err){
			res.send(err);
		}
		
		res.json({ message: 'model added to the database!', data: model})
	});
};

//Updates a model
exports.putModel = function(req, res) {
	Model.update(
		{userID: req.user._id, _id: req.params.model_id},
		{quantity: req.body.quantity},
		function(err, num, raw) {
			if(err){
				res.send(err);
			}
			res.json({ message: num+' updated'})
	});
	
};

exports.deleteModel = function(req, res) {
	Model.remove( 
		{userID: req.user._id, _id: req.params.model_id},
		function(err) {
			if(err){
				res.send(err);
			}
			
			res.json( {mesage: 'model removed'} );
		});
};

exports.getTestJSON = function(req, res) {
	res.json({message: 'This is some exmaple JSON!'})
}