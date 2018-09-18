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
    })