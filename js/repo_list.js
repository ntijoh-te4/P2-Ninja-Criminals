const getRepoTemplate = document.createElement('template');
getRepoTemplate.innerHTML = `
    <style>
        @import url("https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css");

        *, html {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .card {
            width: fit-content;
        }

        .info {
            display: flex;
        }

        .seperator {
            margin-left: .5rem;
            margin-right: .5rem;
        }

        .forks {
            position: absolute;
            right: .5rem
        }
    </style>
    <section class="card">
        <h3>Repo name</h3>
        <section class="info">
            <a class="show-fork" href="">Show Forks</a>
            <p class="seperator">|<p>
            <a class="to-github" href="">Show on GitHub</a>
            <p class="forks grey-text">0</p>
        </section>
    </section>
`;

class RepoList extends HTMLElement{
    constructor({info}){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(getRepoTemplate.content.cloneNode(true));

        this.setAttribute('repo-name', info.name);
        this.setAttribute('repo-forks-url', info.forks);

        this.shadowRoot.querySelector('h3').innerText = info.name;
        this.shadowRoot.querySelector('.to-github').setAttribute('href', info.link);
    }
}

window.customElements.define('repo-list', RepoList);