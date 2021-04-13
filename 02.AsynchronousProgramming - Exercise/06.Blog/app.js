function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', loadPosts);
    document.getElementById('btnViewPost').addEventListener('click', displayPosts);
}

attachEvents();

async function loadPosts() {
    const select = document.getElementById('posts')
    select.innerHTML = ''
    const url = 'http://localhost:3030/jsonstore/blog/posts'
    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(object => {
        const option = document.createElement('option');
        option.value = object.id;
        option.textContent = object.title;
        select.appendChild(option)
    }) 
}

async function getPostsAndComments(id) {
    const postTitle = document.getElementById('post-title');
    const commentsUl = document.getElementById('post-comments');
    commentsUl.innerHTML = '';

    const postsUrl = 'http://localhost:3030/jsonstore/blog/posts/' + id
    const response = await fetch(postsUrl);
    const data = await response.json();
    postTitle.textContent = data.title.toUpperCase()
    const postUl = document.getElementById('post-body');
    postUl.textContent = data.body

    const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments'
    const commentsResponse = await fetch(commentsUrl);
    const commentsData = await commentsResponse.json();
    const comments = Object.values(commentsData).filter(c => c.postId === id);
    

    comments.forEach(object => {
        const li = document.createElement('li');
        li.id = object.id
        li.textContent = object.text
        commentsUl.appendChild(li)
    })
}

function displayPosts() {
    const id = document.getElementById('posts').value;
    getPostsAndComments(id)

}
