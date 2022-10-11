const getRepoTemplate = document.createElement('template');
getRepoTemplate.innerHTML = `
    <section>
        <h3>Repo name</h3>
        <section>
            <a href="">show forks</a>
            <p>|<p>
            <a href="">show on github</a>
        </section>
    </section>
`;

class GetRepo extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(getRepoTemplate.content.cloneNode(true));

    }
}

window.customElements.define('get-repo', GetRepo);