async function lockedProfile() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const response = await fetch(url);
    const data = await response.json();
    const mainDIv = document.getElementById('main')
    mainDIv.innerHTML = ''

    Object.values(data).forEach(object => {
        let id = object._id;
        let username = object.username
        let email = object.email
        let age = object.age
        let div = document.createElement('div')
        div.className = 'profile'

        div.innerHTML = `
                        <img src="./iconProfile2.png" class="userIcon" />
                        <label>Lock</label>
                        <input type="radio" name="user1Locked" value="lock" checked>
                        <label>Unlock</label>
                        <input type="radio" name="user1Locked" value="unlock"><br>
                        <hr>
                        <label>Username</label>
                        <input type="text" name="user1Username" value=${username} disabled readonly />
                        <div id=${id} style="display:none">
                            <hr>
                            <label>Email:</label>
                            <input type="email" name="user1Email" value=${email} disabled readonly />
                            <label>Age:</label>
                            <input type="email" name="user1Age" value=${age} disabled readonly />
                        </div>
                        <button>Show more</button>
                        `

        mainDIv.appendChild(div)
    })

    const buttons = document.getElementsByTagName('button');
    Array.from(buttons).forEach(b => {
        b.addEventListener('click', (e) => {
            const unlockBtn = e.target.parentNode.children[4];
            const divId = e.target.parentNode.children[9]

            if (unlockBtn.checked) {
                if (e.target.textContent === 'Show more') {
                    divId.style.display = 'block';
                    e.target.textContent = 'Hide it'
                } else {
                    divId.style.display = 'none';
                    e.target.textContent = 'Show more'
                }

            }
        })
    })

}