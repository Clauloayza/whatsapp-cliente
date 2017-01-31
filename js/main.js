function Chat()
{
	this.nombre = '';
	this.people = [];
	this.messages = [];
	this.chatAvatar = '';
}
function Person(_name, _avatar)
{
	this.name = _name;
	this.avatar = _avatar;
}
function Message(_message, _sender)
{
	this.message = _message;
	this.sender = _sender;
	this.received = false;
}
function Whatsapp()
{
	this.chats = [];
	this.selectedChat = null;
	this.searchChat		= function(_keyword){};
	this.getChatFromId	= function(_chatId){};
	this.drawChatList	= function(_htmlTarget){
		var ulChatList = document.getElementById('chat-list');

		for (var i in this.chats) {
			console.log(this.chats[i].messages);
			var htmlChatList = '<li><div class="avatar">' +
					'<img src="' + this.chats[i].chatAvatar + '" alt="" class="wh-44">' +
					'<h4 class="w-contact-name">' + this.chats[i].nombre +'</h4>' +
					'<p class="w-last-message">' + this.chats[i].messages[this.chats[i].messages.length-1].message + '</p>' +
				'</div>' +
				'<div class="time">03/01/2016</div>' +
			'</li>';
			ulChatList.innerHTML += htmlChatList;
		}





	};
	this.drawMessageList= function(){
		var divChat = document.getElementById('chat');
		divChat.innerHTML = '';

		for (var i in this.selectedChat.messages) {
			if (object.hasOwnProperty(i)) {
				console.log(this.selectedChat.messages[i]);
				this.sendMessage(this.selectedChat.messages[i], false);
			}
		}
	};
	this.getLastMessage = function(){
		return this.selectedChat.messages[this.selectedChat.messages.length-1];
	};
	this.sendMessage	= function(_message, _in){
		var htmlMessageIn = '<div class="w-message w-message-in"><div class="w-message-text"><p>' + _message.message + '</p><div class="time">14:27</div></div></div>';
		var htmlMessageOut = '<div class="w-message w-message-out"><div class="w-message-text"><p>' + _message.message + '</p><div class="time">14:27</div></div></div>';
		var divChat = document.getElementById('chat');

		this.selectedChat.messages.push(_message);

		if(_in)
		{
			divChat.innerHTML += htmlMessageIn;
		}else{
			divChat.innerHTML += htmlMessageOut;
		}

		divChat.scrollTop = divChat.scrollHeight;
	};
}




//----------------------------ListDinamica

var wapp = new Whatsapp();

var me = new Person('Gerson');
var Mary = new Person('Mary');
var Gio = new Person('Gio');
var Giuly = new Person('Giuly');
var Maday = new Person('Maday');

//------------------chat1
var chat = new Chat();
chat.nombre = "Mary";
chat.people.push(Mary);
chat.chatAvatar = 'https://scontent.flim5-1.fna.fbcdn.net/v/t1.0-9/12507303_10208308713225859_6364601605553639551_n.jpg?oh=8c7c4232e0e665aea58910644aac2bc3&oe=59012761';

wapp.chats.push(chat);


//------------------chat2
var chat2 = new Chat();
chat2.nombre = "Gio";
chat2.chatAvatar = 'https://scontent.flim5-1.fna.fbcdn.net/v/t1.0-9/14691114_10207565720916915_3021345534883774270_n.jpg?oh=5aaee18df7e87cd4195ddd00b8de4ef0&oe=5949C8EA';
chat2.people.push(Gio);

wapp.chats.push(chat2);


//------------------chat3
var chat3= new Chat();
chat3.nombre= "Giuly";
chat3.chatAvatar='https://secure.polyvoreimg.com/cgi/img-thing/size/l/tid/39757469.jpg';
chat3.people.push(Giuly);

wapp.chats.push(chat3);

//----------------chat4
var chat4= new Chat();
chat4.nombre= "Maday";
chat4.chatAvatar= 'http://s1.favim.com/orig/150412/atardecer-beach-cielo-colores-Favim.com-2642350.jpg';
chat4.people.push(Maday);

wapp.chats.push(chat4);

wapp.selectedChat = chat;

wapp.sendMessage(new Message('Hola', Mary),Mary);
wapp.sendMessage(new Message('Que tal?', me), Mary);
wapp.sendMessage(new Message('Yo muy bien, tu que tal?', Mary), Mary);


wapp.selectedChat = chat2;

wapp.sendMessage(new Message('Hola', me), me);
wapp.sendMessage(new Message('Tienes un peine?', Gio), Gio);

wapp.selectedChat= chat3;

wapp.sendMessage(new Message('holu', Giuly), Giuly);
wapp.sendMessage(new Message('XD', me), me);

wapp.selectedChat= chat4;

wapp.sendMessage(new Message('Hola que haciendo?', Maday), Maday);
wapp.sendMessage(new Message(':3', me), me);

console.log(wapp.getLastMessage().sender);
wapp.drawChatList();

//--------------------------------Agregar mensaje

var mensaje;
var chat;


window.onload = inicializar;


function inicializar(){
	mensaje= document.getElementById("mensajes");
    chat= document.getElementById("chat");
	mensaje.addEventListener('keyup', onInputKeyUp);
}

function onInputKeyUp(evt){
	
    if(evt.keyCode==13 && mensaje.value.length!=0){
        sendMensaje();
    }
}

function sendMensaje(){
	var chat= document.getElementById("chat");
	var texto= mensaje.value;
	var cuadro= document.createElement('div');
	cuadro.className="w-message w-message-out";
	var cuadro2= document.createElement('div');
	cuadro2.className="w-message-text";
	var parrafo= document.createElement('p');
	var time= document.createElement('div');
	time.className="time";
	
	var horario= new Date();
	var hora= horario.getHours();
	var minuto= horario.getMinutes();
	
	if(minuto<10){
		minuto='0'+minuto;
	}
	
	chat.scrollTop==chat.scrollHeight;
	
	time.innerHTML=hora+":"+minuto;
	parrafo.innerHTML=texto;
	cuadro.appendChild(cuadro2);
	cuadro2.appendChild(parrafo);
	cuadro2.appendChild(time);
	chat.appendChild(cuadro);
	
	mensaje.value="";
    mensaje.focus();
    
}

//--------------------------------buscador

var search = document.getElementById("search");
var contacto = document.getElementsByTagName("h4");
var forEach = Array.prototype.forEach;

search.addEventListener("keyup", function(e){
  var choice = this.value;

  forEach.call(contacto, function(f){
      if (f.innerHTML.toLowerCase().search(choice.toLowerCase()) == -1)
          f.parentNode.parentNode.style.display = "none";   
      else
         f.parentNode.parentNode.style.display = "block";        
  });
}, 
false);
