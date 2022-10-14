
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
    `
}

resetGreeting();