class SearchbarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(this.#template().content.cloneNode(true));

        //eventlistener som displayar forms
        this.icon = this.shadowRoot.querySelector('i');
        this.icon.style.paddingLeft = '8px';

        this.icon.addEventListener('click', () => {
            if(!main.querySelectorAll('login-form').length){
                main.querySelector('h1').style.display = 'none';
                main.querySelector('p').style.display = 'none';
                main.appendChild(new LoginForm());
            }
        });

        // eventlistener som skriver ut vad som står i textfältet, primärt för debugging

        this.shadowRoot.querySelector('#inputbar').addEventListener('keyup', (e) => {
            if(e.keyCode === 13){
                const title = document.createElement('h1');
                title.innerText = 'Welcome to Teacher-o-Matic!'
                main.innerHTML = '';
                if (this.searchbarContent === '') {
                    main.appendChild(title);
                    title.style.display = 'block';
                } else {
                    const repoUserTitle = document.createElement('h3');
                    repoUserTitle.textContent = `Showing repos of ${this.searchbarContent}`;
                    main.appendChild(repoUserTitle);

                    getRepos(this.searchbarContent.toLowerCase());
                    title.style.display = 'none';
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