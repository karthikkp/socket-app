var users = [];

exports.all = function(){
	return users;
}
exports.newUser = function(req,res){
	users.push(req.body.nickname);
	res.render('chat');
}