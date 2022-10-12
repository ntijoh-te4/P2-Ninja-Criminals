
const getRepos = async (username) => {

    const req = await fetch(`https://api.github.com/users/${username}/repos`);
    const res = await req.json();
    const main = document.querySelector('main');

    main.addEventListener('click', (e) => {
        e.preventDefault()
        if(e.composedPath()[0].className === "show-fork"){

            const forksLink = e.target.getAttribute('repo-forks-url');
            console.log(forksLink);

            document.querySelectorAll('get-repo').forEach(element => {
                element.remove();
            });

            //add function to get forks
        }
    });

    res.forEach(element => {
        const info = {name: element.name, forks: element.forks_url, link:element.html_url};
        main.appendChild(new GetRepo({info}));
    });
    
} 
