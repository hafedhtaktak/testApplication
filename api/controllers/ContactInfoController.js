/**
 * ContactInfoController
 *
 * @description :: Server-side logic for managing Contactinfoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	save:function(req, res){

		//YOUR CODE GOES HERE
		
		 /** This is the function which save the three  fields from the front end form composed by email, name and the message */
		 
		 var email = req.body.email;//Getting email value from the body of the request
		 
		 var name = req.body.name;// Getting name value from the body of the request
		 
		 var message = req.body.message;// Getting message value from the body of the request
         
		/**This function allows to us to record the values already parsed */
 		ContactInfo.create({email:email, name:name, message:message}).exec(function(err){
 			if(err){
 				 res.errorMessage("err"); // Throwing message error in case of a save error
			 }

			
			 return res.send("ok"); // Response in case of a successful record
 		});
 		
		 
	}
	
};

