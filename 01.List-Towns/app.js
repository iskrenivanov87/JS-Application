import { html, render } from '../node_modules/lit-html/lit-html.js'

const template = (data) =>
    html`
<ul>
    ${data.map(t => html`<li>${t}</li>`)}
</ul>`;

document.getElementById('btnLoadTowns').addEventListener('click', update)

function update(event) {
    event.preventDefault();
    const townsAsString = document.getElementById('towns').value;
    const towns = townsAsString.split(',').map(t => t.trim())
    const mainDiv = document.getElementById('root');

    const result = template(towns)
    render(result, mainDiv)
}
