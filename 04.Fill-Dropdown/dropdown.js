import { html, render } from '../node_modules/lit-html/lit-html.js';

const selectTemplate = (list) => html`
<select id="menu">
    ${list.map(l => html`<option value=${l._id}>${l.text}</option>`)}
</select>`;


let main = document.querySelector('div')
initialization()

async function initialization() {
    

    const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    const data = await response.json()

    let list = Object.values(data)
    
    document.querySelector('form').addEventListener('submit', (e) => addItem(e, list))
    update(list)
}

function update(list) {
    const result = selectTemplate(list);
    render(result, main)
}

async function addItem(e, list) {
    e.preventDefault()
    
    const formData = new FormData(e.target)
    const item = {
        text: formData.get('itemText')
    }

    const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    })

    const result = await response.json();
    list.push(result)

    update(list)
    e.target.reset()
}