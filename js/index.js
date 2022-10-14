const main = document.querySelector('main');

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
    const req = await fetch(`http://localhost:4567/api/users/${name}/${password}`);
    const res = await req.json();

    document.cookie = `id=${res[0].id}`;
    document.cookie = `name=${res[0].name}`;

    console.log(document.cookie);
    
    resetGreeting();
}

const resetGreeting = () => {
    main.innerHTML = `
        <h1>Welcome to  Teacher-o-Matic${getCookieValue('name') ? '\n'+getCookieValue('name') : ""}!</h1>
        <p>Enter your GitHub username in the header field</p>
    `;
}

resetGreeting();