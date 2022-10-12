class ForkList extends HTMLElement {
    constructor(_data) {
        super();
        this.attachShadow({ mode: "open"} );
        this.shadowRoot.appendChild(this.#template().content.cloneNode(true))

        this.shadowRoot.querySelector('#comment').addEventListener('focus', (e) => {
            this.shadowRoot.querySelector('label[for=comment]').classList = 'active'
        })
        this.shadowRoot.querySelector('#comment').addEventListener('blur', (e) => {
            if (this.shadowRoot.querySelector('#comment').value.trim().length === 0) {
                this.shadowRoot.querySelector('label[for=comment]').classList = ''
                this.shadowRoot.querySelector('#comment').value = ''
            }
        })

        this.shadowRoot.querySelector('.card-action').style.position = 'relative'

        // Ändra alla värden från input (byta ut data.* mot rätt värden)
        // this.shadowRoot.querySelector('.card-title').textContent = data.name
        // this.shadowRoot.querySelector('.white-text').textContent = data.code
        // this.shadowRoot.querySelector('p a').href = data.link
        // this.shadowRoot.querySelector('.tests').innerHTML = data.tests
    }

    #template() {
       const template = document.createElement('template')
       template.innerHTML = 
       `
        <style>
            @import url("https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css");
            @import url("https://fonts.googleapis.com/icon?family=Material+Icons");

            *, html {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            section {
                width: fit-content;
                border: 1px solid grey;
            }

            .card.large {
                height: auto;
            }
        </style>

        <section class="card large">
            <span class="card-title">itggot-TE4/smallest_of_two</span>
            <article class="card-image waves-effect waves-block waves-light">
                <pre class="blue-grey darken-4">
                    <code class="white-text">
                        function smallestOfTwo(num1, num2) {
                            if (num1 < num2) return num1
                            if (num2 < num1) return num2
                            return num1
                        }
                    </code>
                </pre>
            </article>
            <p><a href="https://github.com/itggot-TE4/smallest_of_two">Show on GitHub</a></p>
            <article class="tests">
                <p>Test "First is smallest": Passed</p>
                <p>Test "Second is smallest": Passed</p>
                <p>Test "Same size": Passed</p>
            </article>
            <article class="card-action">
                <form action="#" class="col s12">
                    <aside class="input-field col s6">
                        <input id="comment" type="text" class="validate"></input>
                        <label for="comment">Comment</label>
                    </aside>
                    <p>
                        <label>
                            <input name="group1" type="radio" checked/>
                            <span><i class="material-icons prefix">done</i>Klar</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input name="group1" type="radio" />
                            <span><i class="material-icons prefix">refresh</i>Återgärd krävs</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input name="group1" type="radio" />
                            <span><i class="material-icons prefix">visibility_off</i>Ej Bedömd</span>
                        </label>
                    </p>
                    <br>
                    <button class="btn waves-effect waves-light" type="submit">Save</button>
                </form>
            </article>
        </section>
        `

        return template
    }
}

window.customElements.define('fork-list', ForkList)