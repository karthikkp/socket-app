
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , user = require('./users')
  , path = require('path');

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);

  
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req,res){
  res.render('index',{title:"Chat App"});
});

var users=[];
app.post('/',function(req,res){
  users.push(req.body.nickname);
  res.render('chat',{title:"Chat"});
});

io.sockets.on('connection',function(socket){
  socket.on('nicknames',function(nick){
    users[socket.client] = nick;
    console.log(socket.client + "hiiiiiiiiii");
    
  });
  socket.on('message',function(msg){
    console.log("hi");
    
      socket.broadcast.emit('broadcast',msg,users[socket.client]);
    
    
  });

})

server.listen(app.get('port'));