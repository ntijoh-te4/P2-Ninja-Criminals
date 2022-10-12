
const getRepos = async (username) => {

    const req = await fetch(`https://api.github.com/users/${username}/repos`);
    const res = await req.json();

    console.log(res)
    const main = document.querySelector('main');
    
    main.addEventListener('click', async (e) => {
        e.stopPropagation()
        if(e.composedPath()[0].className === "show-fork"){
            e.preventDefault()
            document.querySelectorAll('get-repo').forEach(element => {
                element.remove();
            });
            const resp = await fetch(`https://api.github.com/repos/${username}/${e.target.getAttribute('repo-name')}/contents/.manifest.json`);
            const data = await resp.json();
            const decoded = atob(data.content)
            console.log(decoded)

            // få tag i filePath från manifest.json
            // för varje fork url {
                // const forkReq = await fetch(e.target.getAttribute('repo-forks-url'))
                // const forkResp = await forkReq.json()
                // main.appendChild(new ForkList(forkResp))
            // }

        }
    });

    res.forEach(element => {
        const info = {name: element.name, forks: element.forks_url, link:element.html_url};
        main.appendChild(new RepoList({info}));
    });
} 
