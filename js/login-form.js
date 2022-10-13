const loginTemplate = document.createElement('template');
loginTemplate.innerHTML = `
    <form>
        <input id="name" type="text" placeholder="name"/>
        <input type="text" placeholder="role"/>
        <input type="text" placeholder="password"/>
        <input type="submit" value="submit"/>
    </form>
`;

class RegisterForm extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(loginTemplate.content.cloneNode(true));
        this.form = this.shadowRoot.querySelector('form');
        this.form.setAttribute('where-to','register');
        this.form.onsubmit = this.register;

        this.name = this.shadowRoot.querySelector('input[placeholder="name"]').value;
        this.role = this.shadowRoot.querySelector('input[placeholder="role"]').value;
        this.password = this.shadowRoot.querySelector('input[placeholder="password"]').value;
    }

    register = async (e) => {
        e.preventDefault();

        if(this.form.getAttribute('where-to') === 'register'){

            const body = {
                name: this.shadowRoot.querySelector('input[placeholder="name"]').value,
                role: this.shadowRoot.querySelector('input[placeholder="role"]').value,
                password: this.shadowRoot.querySelector('input[placeholder="password"]').value,
            }

            const req = await fetch('http://localhost:4567/api/users', {
                method:"POST",
                body: JSON.stringify(body)
            })
            const res = await req.json();
            console.log(res);
        }
    }
}

window.customElements.define('reg-form', RegisterForm);