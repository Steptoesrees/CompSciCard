

var promptver = ['pre_history_prompt','Chatbot_personality', 'user_personality',  'scenario'];

var input = document.getElementById("chatInput");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    var char = document.getElementById("charname").value;
    var user = document.getElementById("username").value;
    
    for (var i = 0; i < 3; i++) {
      chatHistoryMessages[i] = {role: "system", content: `${document.getElementById(promptver[i]).value.replaceAll("{{user}}",user).replaceAll("{{char}}",char)}`};
      console.log(chatHistoryMessages[i]);
    }

    document.getElementById("chatButton").click();

    
    console.log(chatHistoryMessages)
  }
})

var input2 = document.getElementById("scenario");

input2.addEventListener("keypress", function(event) {
  if (event.key === "Enter")
    event.preventDefault();
    var char = document.getElementById("charname").value;
    var user = document.getElementById("username").value;

    chatHistoryMessages[3] = {role: "system", content: `${document.getElementById("scenario").value.replaceAll("{{user}}",user).replaceAll("{{char}}",char)}`};
    console.log(chatHistoryMessages[3]);

    input2.setAttribute('disabled', 'true');

    outputMessage(char, chatHistoryMessages[3].content, true);
})