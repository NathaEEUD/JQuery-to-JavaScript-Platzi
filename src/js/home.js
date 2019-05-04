const $actionContainer = document.querySelector('#action');
const $dramaContainer = document.getElementById('drama');
const $animationContainer = document.getElementById('animation');

const $modal = document.getElementById('modal');
const $overlay = document.getElementById('overlay');
const $hideModal = document.getElementById('hide-modal');

const $featuringContainer = document.getElementById('featuring');
const $form = document.getElementById('form');
const $home = document.getElementById('home');

const $modalTitle = $modal.querySelector('h1');
const $modalImage = $modal.querySelector('img');
const $modalDescription = $modal.querySelector('p');

const $playlistContainer = document.querySelector('.myPlaylist');

const $friendsContainer = document.querySelector('.playlistFriends');

const FRIENDS_API = 'https://randomuser.me/api/';
const MOVIES_API = 'https://yts.am/api/v2/';

(async function load() {
  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();

    if (data.data.movie_count > 0) {
      return data;
    }

    throw new Error('No se encontró ningún resultado');
  }

  // playlist
  function movieItemPlaylistTemplate(title) {
    return(
      `
      <li class="myPlaylist-item">
        <a href="#">
          <span>
            ${title}
          </span>
        </a>
      </li>
      `
    )
  }

  function renderMoviePlaylist(movies, $container) {
    movies.forEach(movie => {
      const { title } = movie;
      const HTMLString = movieItemPlaylistTemplate(title);
      const moviePlaylistElement = createTemplate(HTMLString);
      $container.append(moviePlaylistElement);
    });
  }

  const { data: { movies: moviesPlaylist } } = await getData(`${MOVIES_API}list_movies.json?minimum_rating>7&minimum_rating<9&sort_by=rating&limit=9`);
  renderMoviePlaylist(moviesPlaylist, $playlistContainer);
  
  // friends
  async function getFriends(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function friendItemTemplate(friend) {
    const { name: { first } } = friend;
    const { name: { last } } = friend;
    return(
      `
      <li class="playlistFriends-item">
        <a href="#">
          <img src="${friend.picture.thumbnail}" alt="echame la culpa" />
          <span>
            ${capitalizeFirstLetter(first)} ${capitalizeFirstLetter(last)}
          </span>
        </a>
      </li>
      `
    )
  }

  function renderFriendList(list, $container) {
    list.forEach(friend => {
      const HTMLString = friendItemTemplate(friend);
      const friendElement = createTemplate(HTMLString);
      $container.appendChild(friendElement);
    });
  }

  const { results: friends } = await getFriends(`${FRIENDS_API}?results=15`);
  renderFriendList(friends, $friendsContainer);

  // movies
  function videoItemTemplate(movie, category) {
    return(
      `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
        <div class="primaryPlaylistItem-image">
          <img src="${movie.medium_cover_image}">
        </div>
        <h4 class="primaryPlaylistItem-title">
          ${movie.title}
        </h4>
      </div>`
    )
  }

  function createTemplate(HTMLString) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }

  function addEventClick($element) {
    $element.addEventListener('click', () => {
      showModal($element);
    });
  }

  function renderMovieList(list, $container, category) {
    $container.children[0].remove();
    list.forEach(movie => {
      const HTMLString = videoItemTemplate(movie, category);
      const movieElement = createTemplate(HTMLString);
      $container.appendChild(movieElement);
      const image = movieElement.querySelector('img');
      image.addEventListener('load', (e) => {
        event.srcElement.classList.add('fadeIn');
      });
      addEventClick(movieElement);
    });
  }

  async function cacheExists(category) {
    const listName = `${category}List`;
    const cacheList = window.localStorage.getItem(listName);

    if (cacheList) {
      return JSON.parse(cacheList);
    }
    
    const { data: { movies: data } } = await getData(`${MOVIES_API}/list_movies.json?genre=${category}`);
    window.localStorage.setItem(listName, JSON.stringify(data));
    return data;
  }

  // const { data: { movies: actionList } } = await getData(`${MOVIES_API}/list_movies.json?genre=action`);
  const actionList = await cacheExists('action');
  renderMovieList(actionList, $actionContainer, 'action');
  const dramaList = await cacheExists('drama');
  renderMovieList(dramaList, $dramaContainer, 'drama');
  const animationList = await cacheExists('animation');
  renderMovieList(animationList, $animationContainer, 'animation');

  // form: Se quiere asignar la funcionalidad antes de que se haga el request de las movies
  function setAttributes($element, attributes) {
    for (const attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute]);
    }
  }

  function featuringTemplate(peli) {
    return(
      `
      <div class="featuring">
        <div class="featuring-image">
          <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${peli.title}</p>
        </div>
      </div>
      `
    )
  }

  $form.addEventListener('submit', async (e) => {
    e.preventDefault(); // queremos evitar que la página recargue cada vez
    $home.classList.add('search-active');
    const $loader = document.createElement('img');
    setAttributes($loader, {
      src: 'src/images/loader.gif',
      height: 50,
      width: 50
    });
    $featuringContainer.append($loader);

    const data = new FormData($form);
    // Destructuring Objects:
    // const {
    //   data: {
    //     movies: pelis
    //   }
    // } =

    // Handling Errors with promises:
    // await getData(`${MOVIES_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
    //   .then(({ data: {  movies: pelis }}) => {
    //     const HTMLString = featuringTemplate(pelis[0]);
    //     $featuringContainer.innerHTML = HTMLString;
    //   })
    //   .catch(() => {
    //     const HTMLString = featuringTemplate({
    //       medium_cover_image: 'src/images/covers/404.png',
    //       title: `Lo siento, ${data.get('name')} no se encontró`
    //     });
    //     $featuringContainer.innerHTML = HTMLString;
    //   });

    // Handling Errors with try/catch:
    try {
      const { data: { movies: pelis } } = await getData(`${MOVIES_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
      const HTMLString = featuringTemplate(pelis[0]);
      $featuringContainer.innerHTML = HTMLString;
    } catch(error) {
      alert(error.message);
      $loader.remove();
      $home.classList.remove('search-active');
    }
  })
  
  // modal
  function findById(list, id) {
    return list.find((movie) => movie.id === parseInt(id, 10));
  }

  function findMovie(id, category) {
    switch (category) {
      case 'action': {
        return findById(actionList, id);
      }
      case 'drama': {
        return findById(dramaList, id);
      }
      default: {
        return findById(animationList, id);
      }
    }
  }

  function showModal($element) {
    $overlay.classList.add('active');
    $modal.style.animation = 'modalIn .8s forwards';
    // const id = $element.dataset.id;
    // const category = $element.dataset.category;
    const { category, id } = $element.dataset;
    const data = findMovie(id, category);
    $modalTitle.textContent = data.title;
    $modalImage.setAttribute('src', data.medium_cover_image);
    $modalDescription.textContent = data.description_full;
  }

  $hideModal.addEventListener('click', hideModal);

  function hideModal() {
    setTimeout(() => {
      $overlay.classList.toggle('active');
    }, 1000);
    $modal.style.animation = 'modalOut .8s forwards';
  }
})();