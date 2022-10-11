const gitUserName = 'ntijoh-Alexander-Fransson';

const getRepos = async () => {

    const req = await fetch(`https://api.github.com/users/ntijoh-Alexander-Fransson/repos`);
    const res = await req.json();
    console.log(res);

    const p = document.createElement('p');
    p.innerText = JSON.stringify(res);

    const main = document.querySelector('main');

    main.appendChild(p);
    
} 

getRepos();