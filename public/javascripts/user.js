var socket = io.connect('http://localhost:3000');

var nickname = function(){
	socket.emit('nicknames',document.getElementById("nickname").value);
}

window.onload = function(){
	document.getElementById("form").addEventListener('submit',nickname,false);
}