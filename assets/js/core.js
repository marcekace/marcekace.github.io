// Copyright (C) 2023 KaceM

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
document.addEventListener("DOMContentLoaded", ()=> {
    document.getElementById("sidebar-btn").addEventListener("click", () => {
        document.getElementById("sidebar").animate([
            {maxWidth : "320px"},
            {maxWidth : "0px"}
        ], {
            duration : 500,
            fill : "forwards"
        });
    });

    document.getElementById("footer").innerText = `© 2023 - ${new Date().getFullYear()}`;
});


function createElementS(props, type) {
    let element = document.createElement(type);

    for (let prop in props) {
        element[prop] = props[prop];
    }

    return element;
}

function handleForm(token) {
    fetch("https://kacem.alwaysdata.net//contact", {
        method: "POST",
        body: new FormData(document.forms["contact-form"])
    })
    .then((res) => {
        if (res.status === 201) {
            document.forms["contact-form"].innerHTML = "";
            document.getElementById("contact-form").children[0].append(
                createElementS({classList : "color-light", es : "Estimado/a", en : "Dear"}, "paragraph-bilingue"),
                createElementS({classList : "text-justify color-light", es : "Muchas gracias por completar nuestro formulario de contacto. Hemos recibido tu mensaje y nos pondremos en contacto contigo a la brevedad.", en : "Thank you very much for completing our contact form. We have received your message and will get back to you shortly."}, "paragraph-bilingue"),
                createElementS({classList : "text-justify color-light", es : "Valoramos tu interés y estaremos encantados de ayudarte.", en : "We appreciate your interest and will be happy to help you."}, "paragraph-bilingue"),
                createElementS({classList : "color-light", es : "Saludos cordiales.", en : "Kind regards."}, "paragraph-bilingue"),
                createElementS({classList : "text-justify fw-600 color-light", es : "KACEM Servicios Informáticos", en : "KACEM IT Services"}, "paragraph-bilingue")
            );
        }
    })
}

function toggleSideBar() {
    if (document.getElementById("sidebar").clientWidth === 0) {
        document.getElementById("sidebar").animate([
            { maxWidth : "0px" },
            { maxWidth : "320px" }
        ], {
            duration : 500,
            fill : "forwards"
        });
    }
}