const loginTemplate = document.createElement('template');
loginTemplate.innerHTML = `
    <form>
        <h2>login</h2>

        <input type="text" placeholder="name">
        <input type="text" placeholder="password">
        <input type="submit">

        <button id="reg">Register</button>
        <button id="x">X</button>
    </form>
`;

class LoginForm extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(loginTemplate.content.cloneNode(true));
        this.form = this.shadowRoot.querySelector('form');
        this.form.onsubmit = this.handleLogin;

        this.xButton = this.shadowRoot.querySelector('#x');
        this.xButton.addEventListener('click', () => {
            main.querySelector('h1').style.display = 'block';
            main.querySelector('p').style.display = 'block';
            this.remove();
        });

        this.regButton = this.shadowRoot.querySelector('#reg');
        this.regButton.addEventListener('click', () => {
            main.appendChild(new RegisterForm);
            this.remove();
        });
    }

    handleLogin = async (e) => {
        e.preventDefault()

        const name = this.shadowRoot.querySelector('input[placeholder="name"]').value;
        const password = this.shadowRoot.querySelector('input[placeholder="password"]').value;

        await loginFunction(name,password);

        this.remove();
    }
}

window.customElements.define('login-form', LoginForm);

//login function and username constant

const loginFunction = async (name, password) => {
    const req = await fetch(`http://localhost:4567/api/users/${name}/${password}`);
    const res = await req.json();

    document.cookie = `id=${res[0].id}`;
    document.cookie = `name=${res[0].name}`;

    console.log(document.cookie.split('; ').find(row => row.startsWith('id='))?.split('=')[1]);

    const username = document.cookie.split('; ').find(row => row.startsWith('name='))?.split('=')[1]; 
    main.querySelector('h1').innerText = `Welcome to Teacher-o-Matic \n ${username}!`;

    main.querySelector('h1').style.display = 'block';
    main.querySelector('p').style.display = 'block';
}

//see cookie even on reload

const username = document.cookie.split('; ').find(row => row.startsWith('name='))?.split('=')[1]; 
main.querySelector('h1').innerText = `Welcome to Teacher-o-Matic \n ${username}!`;