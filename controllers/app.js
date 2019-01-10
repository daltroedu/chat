const app = require('express')();
const http = require('http').Server(app);
const socket = require('socket.io')(http);
const Mensagens = require('../models/Mensagens')

var usuarios = {};
var data = new Date();
var data_msg = data.toLocaleString();

app.get('/', function(req, res){
  res.send('> Servidor em execucao');
});

socket.on("connection", function(usuario) {
    usuario.on("join", function(nickname){
    	console.log(nickname + " entrou no chat\n");
      usuarios[usuario.id] = nickname;
      usuario.emit("update", "Conectado ao chat com sucesso");
      usuario.broadcast.emit("update", nickname + " entrou no chat.")
    });

    usuario.on("send", function(msg){
    	console.log("[" + data_msg + "] " + usuarios[usuario.id] + ": " + msg);
      usuario.broadcast.emit("chat", usuarios[usuario.id], msg);
      Mensagens.create({
        nickname: usuarios[usuario.id],
        conteudo: msg,
        data: data_msg
      }).then(function(){
        console.log("> Msg de " + usuarios[usuario.id] + " gravada no BD\n")
      }).catch(function(erro){
        console.log("> ERRO DB: " + erro + "\n")
      })
    });

    usuario.on("disconnect", function(){
    	console.log(usuarios[usuario.id] + " saiu do chat\n");
      socket.emit("update", usuarios[usuario.id] + " saiu do chat.");
      delete usuarios[usuario.id];
    });
});

http.listen(3000, function(){
  console.log('Servidor executado em http://localhost:3000');
});