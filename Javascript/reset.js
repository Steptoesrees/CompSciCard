async function resetChat(){
  const chatHistory = document.getElementById('chatHistory');
  document.getElementById("scenario").removeAttribute('disabled');
  chatHistory.innerHTML = ""
  len =chatHistoryMessages.length
  for (var i=4; i < len; i++) {
    chatHistoryMessages.pop(chatHistoryMessages[i])
    console.log("i:", i)
    console.log("chatHistorymessages", chatHistoryMessages)
  }
  console.log(chatHistoryMessages)
}

async function reloadMessage(Messageid){
  const Message = document.getElementById(Messageid);
  outputMessage(charname, )
  Message.innerHTML = ""
  len =chatHistoryMessages.length
  for (var i=4; i < len; i++) {
    chatHistoryMessages.pop(chatHistoryMessages[i])
    console.log("i:", i)
    console.log("chatHistorymessages", chatHistoryMessages)
  }
  console.log(chatHistoryMessages)
}