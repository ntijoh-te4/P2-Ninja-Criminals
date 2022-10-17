class SearchbarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(this.#template().content.cloneNode(true));

        //eventlistener som displayar forms
        this.icon = this.shadowRoot.querySelector('i');
        this.icon.style.paddingLeft = '8px';

        this.icon.addEventListener('click', () => {
            const loggedInUser = document.cookie.split('; ').find(row => row.startsWith('id='))?.split('=')[1];

            if( !loggedInUser && !main.querySelectorAll('reg-form').length && !main.querySelectorAll('login-form').length){

                main.querySelector('h1').style.display = 'none';
                main.querySelector('p').style.display = 'none';
                main.appendChild(new LoginForm());

            }else if(!main.querySelectorAll('logout-popup').length && loggedInUser){

                main.querySelector('h1').style.display = 'none';
                main.querySelector('p').style.display = 'none';
                main.appendChild(new Logout());
            }
        });

        // eventlistener som skriver ut vad som står i textfältet, primärt för debugging

        this.shadowRoot.querySelector('#inputbar').addEventListener('keyup', (e) => {
            if(e.keyCode === 13){
                const title = document.createElement('h1');
                title.innerText = 'Welcome to Teacher-o-Matic!'
                const info = document.createElement('p');
                info.innerText = 'Enter your GitHub username in the header field'
                main.innerHTML = '';
                if (this.searchbarContent === '') {
                    main.style = ''
                    main.appendChild(title);
                    main.appendChild(info);
                } else {
                    const repoUserTitle = document.createElement('h3');
                    repoUserTitle.textContent = `Showing repos of ${this.searchbarContent}`;
                    main.prepend(repoUserTitle);
                    const div = document.createElement('div')
                    div.style.width = '100vw'
                    main.appendChild(div)

                    getRepos(this.searchbarContent.toLowerCase());
                }
            }
        });
    }

    #template() {
        const template = document.createElement('template');
        template.innerHTML = 
        `
        <style>
            @import "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
            @import "https://fonts.googleapis.com/icon?family=Material+Icons";
        </style>

        <nav>
            <div class="green lighten-1">
                <div class="input-field">
                    <i class="material-icons prefix">person_search</i>
                    <input type="text" id="inputbar" class="validate" placeholder="Enter your github username here">
                </div>
            </div>
        </nav>
        `;

        return template
    }

    get searchbarContent() {
        return (this.shadowRoot.querySelector('input').value);
    }
}

window.customElements.define('search-bar', SearchbarComponent)

