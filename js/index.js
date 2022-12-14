const main = document.querySelector('main');

setTimeout( async () => {
    await resetGreeting();
}, 10);

const getRepos = async (username) => {
    main.style.display = 'flex'
    main.style.flexWrap = 'wrap'
    main.style.rowGap = '1rem'
    main.style.justifyContent = 'center'
    await API.fetch(`https://api.github.com/users/${username}/repos`)
        .then((req) => {
            return req.json()
        }).then((res) => {
            res.forEach(element => {
                const info = {name: element.name, forks: element.forks_url, link:element.html_url};
                main.appendChild(new RepoList({info}));
            });
        }).catch((_error) => {
            const errorText = document.createElement('p')
            errorText.textContent = "...who doesn't exist..."
            main.appendChild(errorText)
        })
    
    main.addEventListener('click', async (e) => {
        e.stopPropagation()
        if(e.composedPath()[0].className === "show-fork"){
            e.preventDefault()

            main.innerHTML = ''
            const resp = await API.fetch(`https://api.github.com/repos/${username}/${e.target.getAttribute('repo-name')}/contents/.manifest.json`);
            const data = await resp.json();
            const decoded = atob(data.content)
            const parsedData = JSON.parse(decoded)
            const forkList = await API.fetch(e.target.getAttribute('repo-forks-url'))
            const forkListResp = await forkList.json()
            forkListResp.forEach(async (item) => {
                const forkReq = await API.fetch(item.url)
                const forkResp = await forkReq.json()
                main.appendChild(new ForkList(parsedData, forkResp))
            })
        }
    });
} 

const getCookieValue = (name) => {
    return document.cookie.split('; ').find(row => row.startsWith(name+'='))?.split('=')[1]; 
}

const loginFunction = async (name, password) => {

    const body = {
        name: name,
        password: password
    };

    const req = await fetch(`http://localhost:4567/api/user`,{
        method:"POST",
        body: JSON.stringify(body)
    });
    const res = await req.json();

    document.cookie = `id=${res.id}`;
    document.cookie = `name=${res.name}`;
    document.cookie = `role=${res.role}`;
    
    resetGreeting();
}

const resetGreeting = async () => {
    if(getCookieValue('name')){

        main.innerHTML = `
        <h1>Welcome to  Teacher-o-Matic\n${getCookieValue('name')}!</h1>
        <p>Enter your GitHub username in the header field</p>
        <h4>Comments:</h4>
        `;
        await showUserComments();

    }else{
        main.innerHTML = `
        <h1>Welcome to  Teacher-o-Matic!</h1>
        <p>Enter your GitHub username in the header field</p>
        `;
    }
}

const getComments = async () => {
    const activeId = document.cookie.split('; ').map(cookie => cookie.split('='))[0][1]
    const commentsData = await fetch(`http://localhost:4567/api/comments`, { 
        method: 'POST',
        body: JSON.stringify({id: activeId})
    });
    const responseFromCommentsData = await commentsData.json()
    return responseFromCommentsData
}

const showUserComments = async () => {
    const commentContainer = document.createElement('section')
    const commentContainerHeader = document.createElement('h4')

    commentContainer.style = 'display: flex; flex-wrap: wrap;'
    commentContainer.appendChild(commentContainerHeader)

    const currentComments = await getComments()

    currentComments.forEach(element => {
        const rating = element['rating']
        let ratingColor;
        switch(rating) {
            case 1:
                ratingColor = 'green';
                break;
            case 2:
                ratingColor = 'yellow';
                break;
            case 3:
                ratingColor = 'red';
                break;
        }
        const comment = document.createElement('p')
        comment.innerHTML = 
        `
        <div class="row">
            <div class="col s1 m12">
                <div class="card">
                    <div class="card-content">
                        <p>${element['comment']}</p>
                    </div>
                    <div class="card-action ${ratingColor}">
                        <p>${element['assignment_name']}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
        commentContainer.appendChild(comment)
    }); 
    
    main.appendChild(commentContainer);
}

 