// Copyright (C) 2024 KaceM

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// contacto@kacem.pw
window.customElements.define("paragraph-bilingue", class extends HTMLElement {

    constructor() {
        super();
        this._internals = this.attachInternals();
        this._internals.type = "text";
    }

    connectedCallback() {
        this.innerText = this.es;
        document.addEventListener("DOMContentLoaded", () => {
            if (sessionStorage.getItem("lang") === null) {
                sessionStorage.setItem("lang", "es");
            }
            else if (sessionStorage.getItem("lang") === "en") {
                for (let el of document.querySelectorAll("paragraph-bilingue")) {
                    el.innerText = el[sessionStorage.getItem("lang")];
                }
            }

            document.querySelector("nav button[title='Lenguaje']").addEventListener("click", (event) => {
                this.toggleLang(event);
            });
        });
    }

    toggleLang(event) {
        event.target.innerText = event.target.innerText === "ES" ? "EN" : "ES";
        sessionStorage.setItem("lang", event.target.innerText.toLocaleLowerCase());
        for (let el of document.querySelectorAll("paragraph-bilingue")) {
            el.innerText = el[event.target.innerText.toLocaleLowerCase()];
        }
    }

    set es(value) {
        this.setAttribute("es", value);
    }

    get es() {
        return this.getAttribute("es");
    }

    set en(value) {
        this.setAttribute("en", value);
    }

    get en() {
        return this.getAttribute("en");
    }
});