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
window.customElements.define("custom-experience", class extends HTMLElement {
    animation = [];
    observer = new ResizeObserver(() => {
        for (let obj of this.animation) {
            obj.cancel();
        }
        this.animate();
    });

    constructor() {
        super();
        this._internals = this.attachInternals();
        document.addEventListener("DOMContentLoaded", () => {
            fetch("https://kacem.alwaysdata.net/api/v1/experience", {
                method: "GET",
                headers: {
                    "X-Requested-With" : "XMLHttpRequest"
                }
            })
            .then((res) => res.json())
            .then((json) => {
                for (let obj of json["objs"]) {
                    for (let children of document.getElementById("wrapper").children) {
                        children.appendChild(
                            createElementS({img : obj["img"], description : obj["description"], site : obj["site"]}, "custom-card")
                        );
                    }
                }
            })
            .finally(() => {
                setTimeout(this.animate(), 5000);

                document.getElementById("wrapper").addEventListener("mouseenter", () => {
                    for (let obj of this.animation) {
                        obj.pause();
                    }
                });
                document.getElementById("wrapper").addEventListener("mouseleave", () => {
                    for (let obj of this.animation) {
                        obj.play();
                    }
                });
            });

            this.observer.observe(document.getElementById("wrapper"));
        });
    }

    animate() {
        this.animation = [];
        let w = this.setW() * document.getElementById("wrapper").children[0].childElementCount;

        for (let node of this.querySelectorAll(".wrapper")) {
            let animation = node.animate([
                { transform : "translateX(0)" },
                { transform : `translateX(-${w}px)` }
            ], {
                duration : 40000,
                iterations : Infinity,
                easing : "linear"
            });
            this.animation.push(animation);
        }
    }

    setW() {
        if (document.documentElement.clientWidth <= 320) {
            return 280;
        }
        else if (document.documentElement.clientWidth <= 768) {
            return 384;
        }
        else {
            return 360;
        }
    }
});