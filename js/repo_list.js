const getRepoTemplate = document.createElement('template');
getRepoTemplate.innerHTML = `
    <section>
        <h3>Repo name</h3>
        <section>
            <a class="show-fork" href="">Show Forks</a>
            <p>|<p>
            <a class="to-github" href="">Show on GitHub</a>
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