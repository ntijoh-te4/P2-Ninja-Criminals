const logoutTemplat = document.createElement('template');
logoutTemplat.innerHTML = `
    <section>
        <h2>Are you sure you want to log out?</h2>
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
        this.yesButton.addEventListener('click', async () => {
            
            document.cookie = `id=${getCookieValue('id')}; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
            document.cookie = `name=${getCookieValue('name')}; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
            document.cookie = `role=${getCookieValue('role')}; expires=Thu, 01 Jan 1970 00:00:01 GMT`;

            await resetGreeting();
            this.remove();
        })

        this.noButton = this.shadowRoot.querySelector('#no');
        this.noButton.addEventListener('click', async () => {
            await resetGreeting();
            this.remove();
        })
    }
}

window.customElements.define('logout-popup', Logout);