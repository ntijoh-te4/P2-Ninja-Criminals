const gitUserName = 'ntijoh-Alexander-Fransson';

const getRepos = async () => {

    const req = await fetch(`https://api.github.com/users/ntijoh-Alexander-Fransson/repos`);
    const res = await req.json();
    console.log(res[0]);

    const main = document.querySelector('main');

    res.forEach(element => {
        const info = {name: element.name, forks: element.forks_url};
        console.log(info);
        main.appendChild(new GetRepo({info}));
    });
    
} 

getRepos();