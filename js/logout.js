const logoutTemplat = document.createElement('template');
logoutTemplat.innerHTML = `
    <section>
        <h2>Are you sure you want to logg out</h2>
        <br>
        <button id="yes">Yes!</button> 
        <button id="no">No!</button>
    </section>
`;

class Logout extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(logoutTemplat.content.cloneNode(true));

        this.yesButton = this.shadowRoot.querySelector('#yes');
        this.yesButton.addEventListener('click', () => {
            
            document.cookie = `id=${userId}; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
            document.cookie = `name=${username}; expires=Thu, 01 Jan 1970 00:00:01 GMT`;

            main.querySelector('h1').innerText = `Welcome to Teacher-o-Matic!`;
            main.querySelector('h1').style.display = 'block';
            main.querySelector('p').style.display = 'block';

            this.remove();
        })

        this.noButton = this.shadowRoot.querySelector('#no');
        this.noButton.addEventListener('click', () => {
            main.querySelector('h1').style.display = 'block';
            main.querySelector('p').style.display = 'block';
            this.remove();
        })
    }
}

window.customElements.define('logout-popup', Logout);