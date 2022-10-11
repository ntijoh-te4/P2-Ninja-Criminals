const getRepoTemplate = document.createElement('template');
getRepoTemplate.innerHTML = `
    <section>
        <h3>Repo name</h3>
        <section>
            <a class="show-fork" href="">show forks</a>
            <p>|<p>
            <a class="to-github" href="">show on github</a>
        </section>
    </section>
`;

class GetRepo extends HTMLElement{
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

window.customElements.define('get-repo', GetRepo);