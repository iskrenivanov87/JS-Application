function attachEvents() {
    document.getElementById('submit').addEventListener('click', getWeather);
}

attachEvents();

const symbols = {
    Sunny: '&#x2600', // ☀
    'Partly sunny': '&#x26C5', // ⛅
    Overcast: '&#x2601', // ☁
    Rain: '&#x2614', // ☂
    degrees: '&#176'   // °
}


async function getWeather() {
    const input = document.getElementById('location')
    const cityName = input.value

    try {
        const code = await getCode(cityName);

        const [current, next3days] = await Promise.all([
            getCurrentWeather(code),
            get3DaysForecast(code)
        ])
        document.getElementById('forecast').children[0].children[0].textContent = 'Current conditions'
        document.getElementById('forecast').style.display = 'block'
        
        createCurrentWeather(current)
        createUpcomingWeather(next3days)
    } catch {
        // Не съм сигурен, че разбрах точно къде искат да се изпише грешката
        document.getElementById('forecast').style.display = 'block'
        document.getElementById('forecast').children[0].children[0].textContent = 'Error'
    }
    input.value = ''
}

async function getCode(cityName) {
    const url = 'http://localhost:3030/jsonstore/forecaster/locations'
    const response = await fetch(url);
    const data = await response.json();

    return data.find(x => x.name.toLowerCase() === cityName.toLowerCase()).code
}

async function getCurrentWeather(code) {
    const url = 'http://localhost:3030/jsonstore/forecaster/today/' + code
    const response = await fetch(url);
    const data = await response.json();
    return data
}

async function get3DaysForecast(code) {
    const url = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + code
    const response = await fetch(url);
    const data = await response.json();
    return data
}

function createElement(type, classes, content) {
    let element = document.createElement(type);
    element.className = classes;
    element.innerHTML = content

    return element
}
function createCurrentWeather(current) {
    const mainCurrentDiv = document.getElementById('current');
    if (mainCurrentDiv.children[1]) {
        mainCurrentDiv.children[1].remove()
    }

    const forecastDiv = createElement('div', 'forecasts', '');


    const conditionSymbolSpan = createElement('span', 'condition symbol', symbols[current.forecast.condition])
    const conditionSpan = createElement('span', 'condition', '');

    const spanLocation = createElement('span', 'forecast-data', current.name)

    let temperature = `${current.forecast.low}${symbols.degrees}/${current.forecast.high}${symbols.degrees}`
    const spanTemperature = createElement('span', 'forecast-data', temperature)

    const spanCondition = createElement('span', 'forecast-data', current.forecast.condition);

    conditionSpan.appendChild(spanLocation);
    conditionSpan.appendChild(spanTemperature);
    conditionSpan.appendChild(spanCondition);

    forecastDiv.appendChild(conditionSymbolSpan);
    forecastDiv.appendChild(conditionSpan);

    mainCurrentDiv.appendChild(forecastDiv)
}
function createUpcomingWeather(upcoming) {
    const mainUpcomingDiv = document.getElementById('upcoming');
    if (mainUpcomingDiv.children[1]) {
        mainUpcomingDiv.children[1].remove()
    }

    const forecastInfoDIv = createElement('div', 'forecast-info', '')

    upcoming.forecast.forEach(object => {
        const upcomingSpan = createElement('span', 'upcoming', '');

        const spanSymbol = createElement('span', 'symbol', symbols[object.condition])
        let temperature = `${object.low}${symbols.degrees}/${object.high}${symbols.degrees}`
        const spanTemperature = createElement('span', 'forecast-data', temperature);
        const spanCondition = createElement('span', 'forecast-data', object.condition)

        upcomingSpan.appendChild(spanSymbol);
        upcomingSpan.appendChild(spanTemperature);
        upcomingSpan.appendChild(spanCondition);

        forecastInfoDIv.appendChild(upcomingSpan);

        mainUpcomingDiv.appendChild(forecastInfoDIv);
    })


}