async function getInfo() {
    const input = document.getElementById('stopId');
    const id = input.value;

    const url = 'http://localhost:3030/jsonstore/bus/businfo/' + id

    try {
        const ulElement = document.getElementById('buses')
        ulElement.innerHTML = ''

        const response = await fetch(url);
        const data = await response.json()

        document.getElementById('stopName').textContent = data.name

        Object.entries(data.buses).forEach(([bus, time]) => {
            const li = document.createElement('li');
            li.textContent = `Bus ${bus} arrives in ${time}`

            ulElement.appendChild(li)
        })
    } catch {
        document.getElementById('stopName').textContent = 'Error'
    }
}

