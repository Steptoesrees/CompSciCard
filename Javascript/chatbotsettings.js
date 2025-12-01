

document.getElementById("charname").value = 'bot';
document.getElementById("username").value = 'user';

let chatHistoryMessages = [{
    role: "system",
    content: "you are a helpfull asisstant that is knowledgeable in all topics. you will assist the user to the best of your ability"},
  {
    role: "system",
    content: "you are a helpfull asisstant that is knowledgeable in all topics. you will assist the user to the best of your ability"},
  {
    role: "system",
    content: "you are a helpfull asisstant that is knowledgeable in all topics. you will assist the user to the best of your ability"},
  {
    role: "assistant",
    content: "you are a helpful asisstant that is knowledgeable in all topics. you will assist the user to the best of your ability"}];



let temperature = 0.5;

document.getElementById("top_p").innerHTML = document.getElementById("Chatbot_top_p").value;
document.getElementById("frequency_penalty").innerHTML = document.getElementById("Chatbot_frequency_penalty").value;
document.getElementById("presence_penalty").innerHTML = document.getElementById("Chatbot_presence_penalty").value;



var sliderinput = document.getElementById("Chatbot_temperature");
var tempDisplay = document.getElementById("temperature");
tempDisplay.innerHTML = temperature;

sliderinput.oninput = function() {
  tempDisplay.innerHTML = this.value;
}


document.getElementById("Chatbot_top_p").oninput = function() {
  document.getElementById("top_p").innerHTML = this.value;
}

document.getElementById("Chatbot_frequency_penalty").oninput = function() {
  document.getElementById("frequency_penalty").innerHTML = this.value;
}

document.getElementById("Chatbot_presence_penalty").oninput = function() {
  document.getElementById("presence_penalty").innerHTML = this.value;
}



let max_Tokens = 1000;





