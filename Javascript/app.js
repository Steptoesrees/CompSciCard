

 // Get this from DeepSeek's dashboard





async function sendChatMessage() {
    const userInput = document.getElementById('chatInput').value;
    
    if (!userInput.trim()) return;
    
    // Add user message to chat history
    chatHistoryMessages.push({role:"user",content: userInput})
    var char = document.getElementById("charname").value;
    var user = document.getElementById("username").value;

    userMessage = outputMessage(user, userInput, true)
      
    // Clear input
    document.getElementById('chatInput').value = '';

    await new Promise(resolve => setTimeout(resolve, 200)); // Simulate delay for user experience
    // Add loading indicator
    loadingMessage = outputMessage(char, 'Typing...', false);
    chatHistory.appendChild(loadingMessage);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    // Call API
    const botResponse = await callAPIchat(chatHistoryMessages);
    

    // Remove loading indicator and add bot response
    chatHistory.removeChild(loadingMessage);
    
    botMessage = outputMessage(char, botResponse, true)

    chatHistoryMessages.push({role:"assistant", content: botResponse});
    // Scroll to bottom of chat window
    chatHistory.scrollTop = chatHistory.scrollHeight;

    chatHistoryMessages.push({role: "system", content: `${document.getElementById("post_history_prompt").value.replaceAll("{{user}}",user).replaceAll("{{char}}",char)}`});
    }




function outputMessage(postman, letter, load){

    var char = document.getElementById("charname").value;
    var idnum = chatHistoryMessages.length;

    const chatHistory = document.getElementById('chatHistory');
    const Message = document.createElement('section');
    const Message_icon = document.createElement('img');
    const Message_content = document.createElement('section');
    const Message_info = document.createElement('section');
    const Message_text = document.createElement('section');
    const Message_reload = document.createElement('div');
    const Message_info_text = document.createElement('section');
    const Message_Reload_button = document.createElement('button');
    const Message_Reload_img = document.createElement('img');

    Message.id = `message-${idnum}`;
    Message.className = 'chat_message';
    Message_icon.className = 'chat_message_icon';
    Message_content.className = 'chat_message_content';
    Message_info.className = 'chat_message_info';
    Message_info_text.className = 'chat_message_info_text';
    Message_reload.className = 'chat_message_reload';
    Message_Reload_button.className = 'chat_message_reload_button';
    Message_Reload_button.setAttribute('onclick', `reloadMessage(Message.id)`);
    Message_Reload_img.className = 'reloadImg';
  
    
    if (postman === char){
        readImage(document.getElementById("CiconInput").files[0], Message_icon);
    }
    else{
        readImage(document.getElementById("UiconInput").files[0], Message_icon);
    }
    
    Message_Reload_img.className = 'resetimage';
    Message_Reload_img.src = "imgs/restart.png"

    Message_info_text.textContent = `Time ${new Date().toLocaleTimeString()}`;
    Message_info_text.innerHTML = (`> ${postman} - Time: ${new Date().toLocaleTimeString()}`);

    Message_text.className = 'chat_message_text';
    Message_text.textContent = letter;
    Message_text.innerHTML = marked.parse(letter);
    Message_text.setAttribute(`wrapping`, `soft`);

    Message.appendChild(Message_icon);
    Message.appendChild(Message_content);

    Message_info.appendChild(Message_info_text);
    Message_info.appendChild(Message_reload);
    Message_reload.appendChild(Message_Reload_button);
    Message_Reload_button.appendChild(Message_Reload_img);
    
    Message_content.appendChild(Message_info);
    Message_content.appendChild(Message_text);
    if (load === true) {
        chatHistory.appendChild(Message);
    }
    else {
        return Message
    }
    
}

function readImage(file, element) {
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      // convert image file to base64 string
      element.src = reader.result;
    },
    false,
  );

  if (file) {
    reader.readAsDataURL(file);
  }
} 