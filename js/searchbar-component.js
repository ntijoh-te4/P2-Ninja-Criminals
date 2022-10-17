class SearchbarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(this.#template().content.cloneNode(true));

        //eventlistener som displayar forms
        this.icon = this.shadowRoot.querySelector('i');
        this.icon.style.paddingLeft = '8px';

        this.icon.addEventListener('click', () => {

            if( !getCookieValue('id') && !main.querySelectorAll('reg-form').length && !main.querySelectorAll('login-form').length){

                main.innerHTML = '';
                main.appendChild(new LoginForm());

            }else if(!main.querySelectorAll('logout-popup').length && getCookieValue('id')){

                main.innerHTML = '';
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
                const commentContainer = document.createElement('section')
                const commentContainerHeader = document.createElement('h4')
                commentContainerHeader.innerText = 'Comments:'
                commentContainer.appendChild(commentContainerHeader)
                this.getComments().then(result => {
                    result.forEach(element => {
                        const comment = document.createElement('p')
                        comment.innerHTML = element['comment']
                        commentContainer.appendChild(comment)
                    });
                })
                main.innerHTML = '';
                if (this.searchbarContent === '') {
                    resetGreeting();
                    main.appendChild(title);
                    main.appendChild(info);
                    main.appendChild(commentContainer)
                } else {
                    const userRole = getCookieValue("role");

                    if(userRole) {
                        const repoUserTitle = document.createElement('h3');
                        repoUserTitle.textContent = `Showing repos of ${this.searchbarContent}`;
                        main.appendChild(repoUserTitle);

                        getRepos(this.searchbarContent.toLowerCase());
                    } else {
                        const repoUserTitle = document.createElement('h3');
                        repoUserTitle.textContent = `Click near the icon?`;
                        main.appendChild(repoUserTitle);

                        alert('Only the authenticated may look at the repos.\nAuthenticate yourselfe by clicking near the icon.');
                    }
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

    async getComments() {
        const activeId = document.cookie.split('; ').map(cookie => cookie.split('='))[0][1]
        const commentsData = await fetch(`http://localhost:4567/api/comments`, { 
            method: 'POST',
            body: JSON.stringify({id: activeId})
        })
        const responseFromCommentsData = await commentsData.json()
        return responseFromCommentsData
    }
}

window.customElements.define('search-bar', SearchbarComponent)

