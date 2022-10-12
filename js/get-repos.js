const main = document.querySelector('main');

const getRepos = async (username) => {

    await fetch(`https://api.github.com/users/${username}/repos`)
        .then((req) => {
            return req.json();
        }).then((res) => {

            res.forEach(element => {
                const info = {name: element.name, forks: element.forks_url, link:element.html_url};
                main.appendChild(new GetRepo({info}));
            });
        }).catch((error) => {
            const errorText = document.createElement('h4');
            errorText.textContent = `...who doesn't exist...`;
            main.appendChild(errorText);
        });

    main.addEventListener('click', (e) => {
        if(e.composedPath()[0].className === "show-fork"){
            e.preventDefault()

            const forksLink = e.target.getAttribute('repo-forks-url');
            console.log(forksLink);

            document.querySelectorAll('get-repo').forEach(element => {
                element.remove();
            });

            //add function to get forks
        }
    });
} 
