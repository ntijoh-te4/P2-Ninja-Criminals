const registerTemplate = document.createElement('template');
registerTemplate.innerHTML = `
    <form>
        <h2>register</h2>

        <input id="name" type="text" placeholder="name"/>
        <input type="text" placeholder="role"/>
        <input type="text" placeholder="password"/>
        <input type="submit" value="submit"/>

        <button id="x">X</button>
    </form>
`;

class RegisterForm extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(registerTemplate.content.cloneNode(true));
        this.form = this.shadowRoot.querySelector('form');
        this.form.onsubmit = this.register

        this.xButton = this.shadowRoot.querySelector('#x');
        this.xButton.addEventListener('click', () => {
            //ska man ta bort event listeners efter att shadowdom objekt tas bort?
            this.remove();
        });
    }

    register = async (e) => {
        e.preventDefault(e);

        const name = this.shadowRoot.querySelector('input[placeholder="name"]').value;
        const password = this.shadowRoot.querySelector('input[placeholder="password"]').value;

        const checkReq = await fetch(`http://localhost:4567/api/users/${name}/${password}`);
        const checkRes = await checkReq.json();

        if(checkRes.length == 0){
            const body = {
                name: name,
                role: this.shadowRoot.querySelector('input[placeholder="role"]').value,
                password: password,
            }

            const regReq = await fetch('http://localhost:4567/api/users', {
                method:"POST",
                body: JSON.stringify(body)
            })
            const regRes = await regReq.json();
            console.log(regRes);

            // fixa efter att du fixat prevent default main.appendChild(new LoginForm);

            this.remove();
        }else{
            alert('cannot use this name or password');
        }
    }
}

window.customElements.define('reg-form', RegisterForm);