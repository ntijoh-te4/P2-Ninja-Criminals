const getReposTemplate = document.createElement('template');
getReposTemplate.innerHTML = `
<H1>Chose a repo!</H1>
<section>
</section>
`;

class GetRepos extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(getReposTemplate.content.cloneNode(true));
    }
}

window.customElements.define('get-repos', GetRepos);