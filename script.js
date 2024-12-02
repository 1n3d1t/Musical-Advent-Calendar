// Configuración inicial
const clientId = "be266750a57646fc8c022a6922f7daf5"; // Reemplaza con tu Client ID
const clientSecret = "c841b0cc24ac4aa4838dd5e2bfb2a2d9"; // Reemplaza con tu Client Secret

const songs = {
    1: { name: "Unforgettable", artist: "Nat King Cole", link: "https://open.spotify.com/intl-es/track/3eQwtgoiVKbaYuX0ITe2fU?si=4c422b182830466c" },
    2: { name: "I Wish You Love", artist: "Nancy Wilson", link: "https://open.spotify.com/track/7moJWeYfMTr7iWgSHvwF7Y" },
    3: { name: "Teach Me Tonight", artist: "Dinah Washington", link: "https://open.spotify.com/intl-es/track/0Rk9byjmZksAJX15onGns5?si=8c26772a04c940b2" },
    4: { name: "We Are In Love", artist: "Harry Connick, Jr.", link: "https://open.spotify.com/intl-es/track/0cPa96zXRs2LVuNIqu06oj?si=7be9cf4c8254429b" },
    5: { name: "All By Myself", artist: "Ella Fitzgerald", link: "https://open.spotify.com/intl-es/track/18HytBeOyFwGibrghjtrPN?si=f9503959d7a843c8" },
    6: { name: "You Don't Know Me (with Diana Krall)", artist: "Ray Charles, Diana Krall", link: "https://open.spotify.com/intl-es/track/3NhDsoowimZMc97tDuG1T5?si=135541ec9eee4ef6" },
    7: { name: "I Can't Make You Love Me", artist: "Sophie Milman", link: "https://open.spotify.com/intl-es/track/705iPzYuspuFBNDUubyyPA?si=11045f5036a14efb" },
    8: { name: "No Love Dying", artist: "Gregory Porter", link: "https://open.spotify.com/intl-es/track/7he1gIzjGusyHIc4887Cj9?si=db6ef284b84f4446" },
    9: { name: "All The Things You Are", artist: "Ella Fitzgerald, Nelson Riddle", link: "https://open.spotify.com/intl-es/track/5gPetRvxQKyOjjwZX1dzbt?si=29196e6ce6574a5c" },
    10: { name: "They Can't Take That Away from Me (2012 - Remaster)", artist: "Mel Tormé", link: "https://open.spotify.com/intl-es/track/28z6KATfhamoyDgOtcm25F?si=a471f4d729374f85" },
    11: { name: "On The Street Where You Live - Remastered 1998", artist: "Dean Martin", link: "https://open.spotify.com/intl-es/track/6qMMQzYTKabamnMPlCmfxb?si=d9350f2e5a1c45fd" },
    12: { name: "I Get A Kick Out Of You", artist: "Ella Fitzgerald, London Symphony Orchestra", link: "https://open.spotify.com/intl-es/track/3dC8s8LyJGffsHR8J7uHKK?si=33d688fdbac2400b" },
    13: { name: "Blue Moon", artist: "Dean Martin", link: "https://open.spotify.com/intl-es/track/1ccv4yQDq8ouWV3fhwlVIX?si=5bb31e18ab9943b6" },
    14: { name: "Nice 'n' Easy", artist: "Frank Sinatra", link: "https://open.spotify.com/intl-es/track/3h6UK8305lS1rjhNUrn0EY?si=4a930a3c06fd4801" },
    15: { name: "Blue Velvet", artist: "Tony Bennett, k.d. lang", link: "https://open.spotify.com/intl-es/track/1icxduZe57KTaogd6BGfxV?si=a98036ba51a34df8" },
    16: { name: "Every Little Bit Hurts", artist: "Ida Sand", link: "https://open.spotify.com/intl-es/track/568uvQ8gGlhsVtY4nQuhZI?si=1c3161f922fa495f" },
    17: { name: "Body And Soul", artist: "Amy Winehouse, Tony Bennett", link: "https://open.spotify.com/intl-es/track/6zR8QJKAaSsjQHZV7ch4z2?si=d17c838f0a7b41ac" },
    18: { name: "This Bitter Earth - 2002 Mix", artist: "Aretha Franklin", link: "https://open.spotify.com/intl-es/track/2J5zN6thoJE9ZmeVtE5kKA?si=2c48699354084dbf" },
    19: { name: "I Could Write a Book", artist: "Harry Connick, Jr.", link: "https://open.spotify.com/intl-es/track/2zSnnXvex1yMcPUn4mg27H?si=fcafed1c43dc45c3" },
    20: { name: "Alone Together", artist: "Catherine Russell", link: "https://open.spotify.com/intl-es/track/4Xvm5OFMhE0iaaBJKPfhcx?si=c18871aac59348e9" },
    21: { name: "Break It To Me Gently", artist: "Brenda Lee", link: "https://open.spotify.com/intl-es/track/5JccvAiwcZ7n3urnXqWPsG?si=e17a9b0080dc47d7" },
    22: { name: "Teach Me Tonight", artist: "Nancy Wilson", link: "https://open.spotify.com/intl-es/track/391jzZNqMz98LcEPFQuBvr?si=85f4d476e56844f5" },
    23: { name: "Time After Time", artist: "Ella Fitzgerald", link: "https://open.spotify.com/intl-es/track/5wwTGzFl5igm6v32sg37D1?si=d0d3a827fbb74588" },
    24: { name: "A Kiss to Build a Dream On", artist: "Tony Bennett, k.d. lang", link: "https://open.spotify.com/intl-es/track/4xsJ6KEsIjsHKWJA7D8GAI?si=8a17c820d3d04004" },
};

// Crear el calendario
const grid = document.getElementById("calendar-grid");

// Generar días desordenados
let days = Array.from({ length: 24 }, (_, i) => i + 1);

// Recuperar el orden aleatorio desde localStorage
const storedOrder = localStorage.getItem("calendarOrder");
if (storedOrder) {
    days = JSON.parse(storedOrder);
} else {
    days.sort(() => Math.random() - 0.5);
    localStorage.setItem("calendarOrder", JSON.stringify(days));
}

// Función para destacar los días que ya han pasado
async function highlightPastDays() {
    const currentDay = new Date().getDate();
    for (let i = 0; i < 24; i++) {
        const day = days[i];
        const square = grid.children[i];
        if (day < currentDay) {
            const song = songs[day];
            if (song) {
                try {
                    const songData = await getSongData(song.link);
                    if (songData) {
                        square.innerHTML = `
                            <div class="thumbnail">
                                <img src="${songData.album.images[0].url}" alt="Portada de ${song.name}">
                            </div>
                            ${day}
                        `;
                        square.classList.add("past-day", "clicked");
                    }
                } catch (error) {
                    console.error(`Error fetching song data for day ${day}:`, error);
                    square.classList.add("past-day");
                    square.style.color = "white";
                }
            } else {
                square.classList.add("past-day");
                square.style.color = "white";
            }
        }
    }
}

for (let i = 0; i < 24; i++) {
    const day = days[i];
    const square = document.createElement("div");
    square.className = "square";
    square.textContent = day;
    square.setAttribute("role", "gridcell");
    square.setAttribute("aria-label", `Día ${day}`);

    square.addEventListener("click", async () => {
        if (new Date().getDate() >= day) {
            const song = songs[day];
            if (song) {
                const songData = await getSongData(song.link);
                if (songData) {
                    // Cerrar ventana emergente existente
                    const existingPopup = document.querySelector(".popup");
                    if (existingPopup) {
                        document.body.removeChild(existingPopup);
                    }
                    showPopup(song.name, song.artist, song.link, songData.album.images[0].url);
                    square.classList.add("clicked");
                    square.innerHTML = `<div class="thumbnail"><img src="${songData.album.images[0].url}" alt="Portada de ${song.name}"></div>${day}`;
                } else {
                    alert("No se encontró la canción.");
                }
            } else {
                alert("No hay canción asignada a este día.");
            }
        } else {
            alert("¡No puedes abrir este día todavía!");
        }
    });

    grid.appendChild(square);
}

// Llamar a highlightPastDays al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    await highlightPastDays();
});


// Destacar los días que ya han pasado al cargar la página
highlightPastDays();

// Mostrar ventana emergente
function showPopup(songName, artist, songLink, songImage) {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.setAttribute("role", "dialog");
    popup.setAttribute("aria-labelledby", "popup-title");
    popup.setAttribute("aria-describedby", "popup-description");
    popup.innerHTML = `
        <img src="${songImage}" alt="Portada de ${songName}">
        <p id="popup-title">${songName} - ${artist}</p>
        <a href="${songLink}" target="_blank" style="text-decoration: none; color: blue;">Escuchar en Spotify</a>
        <button onclick="document.body.removeChild(this.parentNode)">Cerrar</button>
    `;
    document.body.appendChild(popup);
}

// Obtener token de Spotify
let accessToken = null;
let tokenExpirationTime = 0;

async function getAccessToken() {
    if (accessToken && Date.now() < tokenExpirationTime) {
        return accessToken;
    }

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
        },
        body: "grant_type=client_credentials",
    });
    const data = await response.json();
    accessToken = data.access_token;
    tokenExpirationTime = Date.now() + (data.expires_in - 60) * 1000; // Restar 60 segundos para seguridad
    return accessToken;
}

// Obtener datos de la canción usando el enlace de Spotify
async function getSongData(link) {
    const token = await getAccessToken();
    const trackId = link.split('/').pop();
    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
}

// Funcionalidad de compartir en redes sociales
const feedbackSection = document.createElement("div");
feedbackSection.className = "feedback-section";
feedbackSection.innerHTML = `
    <div>
        <button onclick="shareAppOnSocialMedia()">Compartir en Redes Sociales</button>
    </div>
`;
document.body.appendChild(feedbackSection);

// Compartir la aplicación en redes sociales
function shareAppOnSocialMedia() {
    const text = `¡Mira esta increíble aplicación de calendario de adviento musical!`;
    const url = encodeURIComponent(window.location.href);
    const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}%20${url}`;
    const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;

    const shareOptions = `
        <a href="${whatsappLink}" target="_blank">Compartir en WhatsApp</a>
        <a href="${twitterLink}" target="_blank">Compartir en Twitter</a>
    `;

    const sharePopup = document.createElement("div");
    sharePopup.className = "share-popup";
    sharePopup.innerHTML = shareOptions;
    document.body.appendChild(sharePopup);
}