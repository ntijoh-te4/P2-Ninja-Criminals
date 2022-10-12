class ForkList extends HTMLElement {
    constructor(file, data) {
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

        this.file = file
        this.data = data
        this.shadowRoot.querySelector('.card-title').textContent = data.full_name
        this.shadowRoot.querySelector('p a').href = data.svn_url

        this.getData()
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

            .waves-effect {
                z-index: 0;
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

    async getData() {
        const url = `${this.data.url}/contents/${this.file}`.replace(/['"]+/g, '')
        const resp = await fetch(url);
        console.log(resp)
        if (resp.status === 200) {
            const data = await resp.json();
            const decoded = atob(data.content)
            this.shadowRoot.querySelector('.white-text').textContent = decoded
        } else {
            this.shadowRoot.querySelector('.white-text').textContent = `Could not find ${this.file}`
        }
        // this.shadowRoot.querySelector('.tests').innerHTML = data.tests
    }
}

window.customElements.define('fork-list', ForkList)