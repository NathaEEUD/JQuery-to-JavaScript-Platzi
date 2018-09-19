console.log('Hola Mundo!');

const noCambia = "Leonidas";
let cambia = "@LeonidasEsteban";

function cambiarNombre(nuevoNombre) {
    cambia = nuevoNombre;
}

const getUser = new Promise(function(todoBien, todoMal) {
    //llamar a un api
    setTimeout(function() {
        todoMal('Se acabó el tiempo');
        // todoBien('Todo está bien en la vida');
    }, 3000);
});

const getUserAll = new Promise(function(todoBien, todoMal) {
    //llamar a un api
    setTimeout(function() {
        // todoMal('Se acabó el tiempo');
        todoBien('Todo está bien en la vida');
    }, 5000);
});

// getUser
//     .then(function() {
//         console.log('Todo está bien en la vida');
//     })
//     .catch(function(message) {
//         console.log(message);
//     })

// Promise.all([
//     getUser,
//     getUserAll
// ])
// .then(function(message) {
//     console.log(message);
// })
// .catch(function(message) {
//     console.log(message);
// })

// Promise.race([
//     getUser,
//     getUserAll
// ])
// .then(function(message) {
//     console.log(message);
// })
// .catch(function(message) {
//     console.log(message);
// })

// $.ajax('https://randomuser.me/api/slgmsgmdpfgm', {
//     method: 'GET',
//     success: function(data) {
//         console.log(data);
//     },
//     error: function(error) {
//         console.log(error);
//     }
// })

fetch('https://randomuser.me/api/sgsngisng')
    .then(function(response) {
        // console.log(response);
        return response.json()
    })
    .then(function(data) {
        console.log('user', data.results[0].name.first);
    })
    .catch(function() {
        console.log('algo falló')
    });

(async function load() {
    async function getData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action');
    const dramaList = await getData('https://yts.am/api/v2/list_movies.json?genre=drama');
    const animationList = await getData('https://yts.am/api/v2/list_movies.json?genre=animation');
    console.log(actionList, dramaList, animationList);
    // debugger
    
    function videoItemTemplate(movie) {
        return (
            `<div class="primaryPlaylistItem">
                <div class="primaryPlaylistItem-image">
                    <img src="${movie.medium_cover_image}">
                </div>
                <h4 class="primaryPlaylistItem-title">
                    ${movie.title}
                </h4>
            </div>`
        )
    }

    actionList.data.movies.forEach((movie) => {
        const HTMLString = videoItemTemplate(movie);
        console.log(HTMLString);
    });

    const $actionContainer = document.querySelector('#action');
    const $dramaContainer = document.getElementById('#drama');
    const $animationContainer = document.getElementById('#animation');
    const $featuringContainer = document.getElementById('#featuring');
    const $form = document.getElementById('#form');
    const $home = document.getElementById('#home');

    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');
    const $hideModal = document.getElementById('hide-modal');

    const modalTitle = $modal.querySelector('h1');
    const modalImage = $modal.querySelector('img');
    const modalDescription = $modal.querySelector('p');

    // console.log(videoItemTemplate('src/images/covers/bitcoin.jpg', 'bitcoin'))

})();