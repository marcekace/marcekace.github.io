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
class Card extends HTMLElement {
    static observedAttributes = ["description"];

    constructor() {
        super();
        this._internals = this.attachInternals();
        this.index = 0;
        this.flag = true;
    }

    connectedCallback() {
        let div = document.createElement("div");
        let top = 0;
        let index = 0;

        div.appendChild(
            createElementS({innerText : this.description}, "p")
        );
        if (this.site !== null) {
            div.appendChild(
                createElementS({href : this.site, classList : "bi bi-globe", target : "_blank", title : "Visitar Sitio"}, "a"));
        }
        if (this.img !== undefined) {
            for (let obj of this.img) {
                let img = createElementS({src : `https://kacem.alwaysdata.net/media/${obj}`}, "img");
                img.style.top = `-${top}px`;
                img.style.zIndex = index;
                top += 504;
                index -= 1;

                this.appendChild(img);
            }

            if (this.img.length > 1) {
                setInterval(() => {
                    this.children[this.index].animate(
                        { filter : ["opacity(1)", "opacity(0)"] },
                        { duration : 5000, fill: "forwards" }
                    );
                    if (this.index === (this.childElementCount - 2)) {
                        this.index = -1;
                    }
                    this.children[++this.index].animate(
                        { filter : ["opacity(0)", "opacity(1)"] },
                        { duration: 5000, fill: "forwards" }
                    );
                }, 10000);
            }
        }
        this.appendChild(div);
    }

    set description(value) {
        return this.setAttribute("description", value);
    }

    get description() {
        return this.getAttribute("description");
    }
};

window.customElements.define("custom-card", Card);