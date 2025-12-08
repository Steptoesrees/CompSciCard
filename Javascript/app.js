

function quitPage(id) {
  var win = document.getElementById(id);
  win.remove();
}


async function getLight() {
  const date = new Date();
  const hour = date.getHours();
  const nightImage = "CSS/FrutigerNBG.webp";
  const dayImage = "CSS/frutigerBG.jpg";
  if (hour <= 7 || hour >= 17) {
    document.body.style.backgroundImage = `url('${nightImage}')`;
  } else {
    document.body.style.backgroundImage = `url('${dayImage}')`;
  }
  console.log(document.body.style.backgroundImage)
}

async function getWeather() {
  const win = document.getElementById('weather-widget');

  const codes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
  };

  try {
    const lat = 52.4128
    const lon = 1.5090
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    if (!response.ok) throw new Error('Weather fetch failed');

    const data = await response.json();
    const temp = data.current_weather.temperature;
    const wind = data.current_weather.windspeed;
    var code = data.current_weather.weathercode;
    var date = data.current_weather.time;
    date = date.slice(0, 10);
    code = data.current_weather.weathercode;
    if (code >= 3 && code < 65 && document.body.style.backgroundImage != 'url("CSS/FrutigerNBG.webp")') {
      document.body.style.backgroundImage = `url('CSS/XPovercast.webp')`;
    }
    if (code >= 65 && document.body.style.backgroundImage != 'url("CSS/FrutigerNBG.webp")') {
      document.body.style.backgroundImage = `url('CSS/XPrain.jpg')`;
    }




    const condition = codes[code] || "Unknown";

    win.innerHTML = `
            <div>Date: ${date}</div>
            <br>
            <div>Temp: ${temp}°C</div>
            <div>Wind: ${wind} km/h</div>
            <div>Condition: ${condition}</div>
            
        `;
  } catch (error) {
    console.error(error);
    win.innerHTML = 'Weather data fetch failed';
  }
}

getLight();
getWeather();


(function () {
  var zmax = 0
  const names = ["Main", "UserA", "UserB", "UserC", "chatbot", "UserE", "UserF"];
  names.forEach((name) => {
    const win = document.getElementById(name);

    if (!win) return;
    const handle = win.querySelector('.windowtopbar');
    if (!handle) {
      return;
    }
    let offsetX = 0, offsetY = 0, dragging = false;

    const onMove = (e) => {
      if (!dragging) return;
      win.style.left = `${e.clientX - offsetX}px`;
      win.style.top = `${e.clientY - offsetY}px`;
    };

    const onUp = () => {
      dragging = false;
      handle.style.cursor = 'grab';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);

    };

    handle.addEventListener('mousedown', (e) => {
      dragging = true;
      handle.style.cursor = 'grabbing';
      const rect = win.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
  });
  names.forEach((name) => {
    var win = document.getElementById(name)
    win.addEventListener('mousedown', () => { win.style.zIndex = ++zmax; });
  });
})();







async function generateResponse(prompt) {
  let apiUrl = "https://text.pollinations.ai/openai";
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "openai-fast",
        messages: prompt,
        max_tokens: 100,
        reasoning: {
          exclude: true
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      console.log('API returned text:', text);
      return text;
    }

    console.log('Full API response:', data);

    // Handle OpenAI-like structure
    if (data.choices && data.choices[0] && data.choices[0].message) {
      console.log(data.choices[0].message.content);
      return data.choices[0].message.content;
    }
    // Handle direct text in JSON if any (fallback)
    else {
      console.log("Unexpected JSON structure:", data);
      return JSON.stringify(data);
    }

  } catch (error) {
    console.error('API Error:', error);
    return "Error generating content. Please try again.";
  }
}


async function generateHaiku() {
  topic = document.getElementById('chatInput').value;
  const prompt = [{ "role": "system", "content": "You are a masterful poet, who writes only the most beautiful poems. The haiku should capture the essence of the theme in a concise and evocative manner. a haiku is a Japanese poem of seventeen syllables, in three lines of five, seven, and five, traditionally evoking images of the natural world. at the end of each line, you MUST add '<br>'" }, { "role": "user", "content": `Write a unique haiku based on this topic: ${topic}` }];

  document.getElementById('chatOutput').textContent = "Generating...";
  const response = await generateResponse(prompt);

  document.getElementById('chatOutput').innerHTML = response;
}
