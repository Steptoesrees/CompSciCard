
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = '123'; // Replace with your actual API key
const ZAPI_KEY = '123'; // Replace with your actual ZAPI key

async function callAPIchat(prompt) {
    model = document.getElementById("Chatbot_model");
    if (model.value == "GLM") {
        try {
            const response = await fetch('https://api.z.ai/api/paas/v4/chat/completions', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ZAPI_KEY}`
                },
                body: JSON.stringify({
                    model: 'GLM-4.5-Flash',
                    messages: prompt,
                    temperature: parseFloat(document.getElementById("Chatbot_temperature").value), 
                    top_p: parseFloat(document.getElementById("Chatbot_top_p").value),
                    frequency_penalty: parseFloat(document.getElementById("Chatbot_frequency_penalty").value),
                    presence_penalty: parseFloat(document.getElementById("Chatbot_presence_penalty").value),
                    max_tokens: max_Tokens,
                    reasoning:{
                        exclude: true
                    }
                })
            }); 

            const data = await response.json();
            
            console.log('Full API response:', data);
            console.log(data.choices[0].message.content);

            return data.choices[0].message.content;
        } catch (error) {
            console.error('API Error:', error);
            return "Error generating content. Please try again.";
        }
    }
    else{
        try {
            const response = await fetch(API_URL, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: document.getElementById("Chatbot_model").value,
                    messages: prompt,
                    temperature: parseFloat(document.getElementById("Chatbot_temperature").value), 
                    top_p: parseFloat(document.getElementById("Chatbot_top_p").value),
                    frequency_penalty: parseFloat(document.getElementById("Chatbot_frequency_penalty").value),
                    presence_penalty: parseFloat(document.getElementById("Chatbot_presence_penalty").value),
                    max_tokens: max_Tokens,
                    reasoning:{
                        exclude: true
                    }
                })
            }); 

            const data = await response.json();
            
            console.log('Full API response:', data);
            console.log(data.choices[0].message.content);

            return data.choices[0].message.content;
        } catch (error) {
            console.error('API Error:', error);
            return "Error generating content. Please try again.";
        }
    }
}

