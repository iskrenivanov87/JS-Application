import { html, render } from '../node_modules/lit-html/lit-html.js'



const trTemplate = (data, select) => html`
   <tr class=${select ? 'select' : '' }>
      <td>${data.firstName} ${data.lastName}</td>
      <td>${data.email}</td>
      <td>${data.course}</td>
   </tr>`;


let input = document.getElementById('searchField')
const tbody = document.querySelector('tbody')


async function start() {
   document.getElementById('searchBtn').addEventListener('click', () => {
      update(list, input.value)
   })
   const response = await fetch('http://localhost:3030/jsonstore/advanced/table')
   const data = await response.json();
   const list = Object.values(data);
   update(list)
}
start()

function update(list, match = '') {
   const result = list.map(l => trTemplate(l, compare(l, match)))
   render(result, tbody)
}

function compare(l, match) {
   return Object.values(l).some(e => match && e.toLowerCase().includes(match.toLowerCase()))
}