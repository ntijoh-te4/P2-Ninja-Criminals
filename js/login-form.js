const loginTemplate = document.createElement('template');
loginTemplate.innerHTML = `
    <form>
        <h2>login</h2>

        <input type="text" placeholder="name">
        <input type="password" placeholder="password">
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
        this.xButton.addEventListener('click', async () => {
            await resetGreeting();
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
