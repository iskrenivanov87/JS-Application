import { html, render } from '../node_modules/lit-html/lit-html.js'
import { towns } from './towns.js'


const templateSearch = (towns, match) => html`
<article>
   <div id="towns">
      <ul>
         <li>${towns.map(t => liTemplate(t, match))}</li>
      </ul>
   </div>
   <input type="text" id="searchText" />
   <button @click=${search}>Search</button>
   <div id="result">${countMatches(towns, match)}</div>
</article>`;


const liTemplate = (name, match) => html`<li class=${(match && name.toLowerCase().includes(match.toLowerCase())) ? 'active' : '' }>${name}</li>`;

const main = document.body;
update()

function update(match = '') {
   const result = templateSearch(towns, match);
   render(result, main)
}

function search(event) {
   const match = event.target.parentNode.querySelector('input').value;
   update(match)
}
function countMatches(towns, match) {
   const matches = towns.filter(t => match && t.toLowerCase().includes(match.toLowerCase())).length
   if (matches) {
      return `${matches} matches found`
   } else {
      return ''
   }
}
