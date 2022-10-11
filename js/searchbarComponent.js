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

class searchbarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // eventlistener som skriver ut vad som står i textfältet, primärt för debugging
        this.shadowRoot.querySelector('#inputbar').addEventListener('keyup', () => {
            console.log(this.searchbarContent);
        });
    }

    // denna metoden skriver ut det som står i textfältet
    get searchbarContent() {
        return (this.shadowRoot.querySelector('input').value);
    }
}

window.customElements.define('search-bar', searchbarComponent)