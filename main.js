const getFormData = async (e) => {
    e.preventDefault();
    const city = e.target.city.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=edc943e760b8b22abc3ad4347643d379`;

    const res = await fetch(url);
    const data = await res.json();

    const name = data.name;
    const kelvin = data.main.temp;
    const feelsLike = data.main.feels_like;
    const tempMax = data.main.temp_max;
    const tempMin = data.main.temp_min;
    const humidity = data.main.humidity;

    const fahrenheit = (kelvin - 273.15) * 9/5 + 32;
    const feelsLikeFahrenheit = (feelsLike - 273.15) * 9/5 + 32;
    const fahrenheitMax = (tempMax - 273.15) * 9/5 + 32;
    const fahrenheitMin = (tempMin - 273.15) * 9/5 + 32;

    const myData = {
        name: name,
        temp: fahrenheit,
        feelsLike: feelsLikeFahrenheit,
        tempMax: fahrenheitMax,
        tempMin: fahrenheitMin,
        humidity: humidity
        
}

    addToPage(myData)
    myForm.reset()

};

const addToPage = (p) => {
    const container = document.querySelector('.container');
    if (container.innerHTML !== ''){
      container.innerHTML = ''
    }
    
    container.style.display = "grid";
    container.style.gridTemplateColumns = "1fr 1fr";
    container.style.gridGap = "1rem";
    
    const title = document.createElement('h3');
    title.innerHTML = `City: ${p.name}`;
    title.style.textAlign = "center";
    title.style.color = "white";
    container.append(title);
  
    const tempCard = document.createElement('div');
    tempCard.classList.add('card');
    tempCard.innerHTML = `
      <div class="card-body">
        <p class="card-text">Current Temp: ${p.temp.toFixed(1)}</p>
      </div>
    `;
    container.append(tempCard);
  
    const feelsLikeCard = document.createElement('div');
    feelsLikeCard.classList.add('card');
    feelsLikeCard.innerHTML = `
      <div class="card-body">
        <p class="card-text">Feels Like: ${p.feelsLike.toFixed(1)}</p>
      </div>
    `;
    container.append(feelsLikeCard);
  
    const tempMaxCard = document.createElement('div');
    tempMaxCard.classList.add('card');
    tempMaxCard.innerHTML = `
      <div class="card-body">
        <p class="card-text">Max Temp: ${p.tempMax.toFixed(1)}</p>
      </div>
    `;
    container.append(tempMaxCard);
  
    const tempMinCard = document.createElement('div');
    tempMinCard.classList.add('card');
    tempMinCard.innerHTML = `
      <div class="card-body">
        <p class="card-text">Min Temp: ${p.tempMin.toFixed(1)}</p>
      </div>
    `;
    container.append(tempMinCard);
  
    const humidityCard = document.createElement('div');
    humidityCard.classList.add('card');
    humidityCard.innerHTML = `
      <div class="card-body">
        <p class="card-text">Humidity: ${p.humidity}</p>
      </div>
    `;
    container.append(humidityCard);
  };



const myForm = document.getElementById('myForm');
myForm.addEventListener('submit', getFormData)