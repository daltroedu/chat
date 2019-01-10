$(document).ready(function(){
    var socket = io.connect("http://localhost:3000");
    var flag = false;

    $("#submit").submit(function(e) {
		e.preventDefault();
		$("#nick").fadeOut();
		$("#chat").fadeIn();
		var usuario = $("#nickname").val();
		$("#name").html(usuario);
		
		flag = true;
		socket.emit("join", usuario);
	});

	$("#textarea").keypress(function(e){
        if(e.which == 13){
        	var conteudo = $("#textarea").val();
        	$("#textarea").val('');
        	var horario = new Date();
				$(".chat").append('<li class="self"><div class="msg"><span>' + $("#nickname").val() + ':</span><p>' + conteudo + '</p><time>' + horario.getHours() + ':' + horario.getMinutes() + '</time></div></li>');
				socket.emit("send", conteudo);					
				document.getElementById('bottom').scrollIntoView();
        }
    });

    socket.on("update", function(msg) {
    	if(flag){
    		$('.chat').append('<li class="info">' + msg + '</li>')
    	}
    });

    socket.on("chat", function(usuario, msg) {
    	if(flag){
			var horario = new Date();
			$(".chat").append('<li class="field"><div class="msg"><span>' + usuario + ':</span><p>' + msg + '</p><time>' + horario.getHours() + ':' + horario.getMinutes() + '</time></div></li>');
    	}
    });
});