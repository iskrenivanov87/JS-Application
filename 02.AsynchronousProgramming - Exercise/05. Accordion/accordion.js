async function solution() {
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const response = await fetch(url);
    const data = await response.json();
    const mainDiv = document.getElementById('main')

    data.forEach(object => {

        let divAccordion = document.createElement('div');
        divAccordion.className = 'accordion'

        let divHead = document.createElement('div');
        divHead.className = 'head';

        let span = document.createElement('span');
        span.textContent = object.title;

        let button = document.createElement('button');
        button.className = 'button';
        button.id = object._id;
        button.textContent = 'More';

        divHead.appendChild(span);
        divHead.appendChild(button);
        divAccordion.appendChild(divHead);

        const divExtra = document.createElement('div')
        divExtra.className = 'extra';
        const p = document.createElement('p');

        divExtra.appendChild(p)
        divAccordion.appendChild(divExtra)

        mainDiv.appendChild(divAccordion);

        button.addEventListener('click', async function() {
            const id = object._id;
            const dataExtra = await getContent(id)
            p.textContent = dataExtra.content

            if (button.textContent == 'More') {
                divExtra.style.display = 'block';
                button.textContent = 'Less'
            } else if (button.textContent == 'Less') {
                divExtra.style.display = 'none';
                button.textContent = 'More'
            }
        })

        async function getContent(id) {
            const urlExtra = 'http://localhost:3030/jsonstore/advanced/articles/details/' + id;
            const responseExtra = await fetch(urlExtra);
            const dataExtra = await responseExtra.json()

            return dataExtra
        }
    })
}

solution()

// Извинявам се, много грозно я написах тази задача, но работи както трябва