const getRepoTemplate = document.createElement('template');
getRepoTemplate.innerHTML = `
    <style>
    @import url("https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css");

    *, html {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    section {
        width: fit-content;
    }

    article {
        display: flex;
    }

    .seperator {
        margin-left: .5rem;
        margin-right: .5rem;
    }

    h3, article {
        padding: 1rem;
    }

    .forks {
        position: absolute;
        right: .5rem;
    }
    </style>
    
    <section class="card">
        <h3>Repo name</h3>
        <article>
            <a class="show-fork" href="">Show Forks</a>
            <p class="seperator">|<p>
            <a class="to-github" href="">Show on GitHub</a>
            <p class="forks grey-text">0</p>
        </article>
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
        this.info = info
        // console.log(this.forks())
        // this.shadowRoot.querySelector('.forks').textContent = this.forks()
    }

    // async forks() {
    //     const req = await API.fetch(this.info.forks)
    //     const resp = await req.json()
    //     const amount = await resp.length
    //     return amount
    // }
}

window.customElements.define('repo-list', RepoList);