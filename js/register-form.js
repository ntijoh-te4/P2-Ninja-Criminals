const registerTemplate = document.createElement('template');
registerTemplate.innerHTML = `
    <form>
        <h2>register</h2>

        <input id="name" type="text" placeholder="name"/>
        <input type="text" placeholder="role" list="roles"/>

        <datalist id="roles">
            <option value="teacher">
            <option value="student">
        </datalist>

        <input type="password" placeholder="password"/>
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
        this.form.onsubmit = this.handleRegister

        this.roleInput = this.shadowRoot.querySelector('input[placeholder="role"]');
        
        this.xButton = this.shadowRoot.querySelector('#x');
        this.xButton.addEventListener('click', async () => {
            //ska man ta bort event listeners efter att shadowdom objekt tas bort?
            await resetGreeting();
            this.remove();
        });
    }

    handleRegister = async (e) => {
        e.preventDefault();

        if(this.roleInput.value === "teacher" || this.roleInput.value === "student"){

            const name = this.shadowRoot.querySelector('input[placeholder="name"]').value;
            const password = this.shadowRoot.querySelector('input[placeholder="password"]').value;
            const body = {
                name: name,
                password: password
            };

            const checkReq = await fetch(`http://localhost:4567/api/user`,{
                method:"POST",
                body: JSON.stringify(body)
            });

            const checkRes = await checkReq.json();

            if(!checkRes){
                const body = {
                    name: name,
                    role: this.roleInput.value,
                    password: password,
                }

                const regReq = await fetch('http://localhost:4567/api/users', {
                    method:"POST",
                    body: JSON.stringify(body)
                });
                const regRes = await regReq.json();
                console.log(regRes);

                await loginFunction(name,password);
            }else{
                alert('cannot use this name or password');
            }

        }else{
            alert('role must be teacher or student');
        }
    }
}

window.customElements.define('reg-form', RegisterForm);