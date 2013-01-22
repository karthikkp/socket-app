var socket = io.connect('http://localhost:3000');
socket.on('broadcast',function(msg,nk){
	var p = document.createElement('p');
	
	p.innerHTML = nk + ": " + msg;
	var chat = document.getElementById('chat');
	chat.appendChild(p);
})

var msg = function(){
	console.log("hi");
	var msg = document.getElementById('msg').value;
	var p = document.createElement('p');
	p.innerHTML = "me: " + msg;
	var chat = document.getElementById('chat');
	chat.appendChild(p);
	socket.emit('message',msg);

}

window.onload = function(){
	document.getElementById("send").addEventListener('click',msg,false);
}