function solve() {
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    const info = document.querySelector('#info span');

    let stopName = 'depot';
    let nextStop;

    async function depart() {
        const url = 'http://localhost:3030/jsonstore/bus/schedule/' + stopName

        const response = await fetch(url);
        const data = await response.json();
        if (data.name == undefined) {
            info.textContent = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        } else {
            info.textContent = `Next stop ${data.name}`
            stopName = data.name;
            nextStop = data.next;
            departBtn.disabled = true;
            arriveBtn.disabled = false;
        };
    };

    function arrive() {
        info.textContent = `Arriving at ${stopName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
        stopName = nextStop;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();