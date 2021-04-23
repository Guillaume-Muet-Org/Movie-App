document.addEventListener('DOMContentLoaded', () => {

    const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bdeb11f93a94fc370b11df2bd474c394';
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'; /** + POSTER_PATH */

    let results;
    let form = document.querySelector('form');
    let input = document.querySelector('input');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let movies = document.querySelectorAll('.movie');
        let search = input.value;

        let SEARCH_URL = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=bdeb11f93a94fc370b11df2bd474c394`;

        let container = document.querySelector('.container').innerHTML = '';

        getMovies(SEARCH_URL);

        input.value = '';
    });

    getMovies(API_URL);

    function getMovies(url) {

        const config = {
            headers: {
                'Accept': 'application/json'
            }
        };

        fetch(url, config)
            .then(res => res.json())
            .then(data => {
                results = data.results;
                
                for(let i = 0; i < results.length; i++) {
                    var id = results[i].id;

                    let container = document.querySelector('.container');

                    if(results[i].poster_path !== null) { /** SI PAS D'IMAGE DISPO, METTRE IMAGE PAR DEFAUT DANS SRC IMG */
                        container.innerHTML += `<div class="movie" id="${id}">
                                                    <img src="${IMG_PATH}${results[i].poster_path}" alt="image">
                                                    <div class="description">
                                                        <h3>${results[i].title}</h3> 
                                                        <span>${results[i].vote_average}</span>
                                                    </div>
                                                    <div class="hide"></div>
                                                </div>`;
                    } else {
                        container.innerHTML += `<div class="movie" id="${id}">
                                                    <img src="default_img.jpeg" alt="image">
                                                    <div class="description">
                                                        <h3>${results[i].title}</h3> 
                                                        <span>${results[i].vote_average}</span>
                                                    </div>
                                                    <div class="hide"></div>
                                                </div>`;
                    }
                                           
                    let movies = document.querySelectorAll('.movie');
                    for(let i = 0; i < movies.length; i++) {
                        if(movies[i].children[1].children[1].textContent < 5) {
                            movies[i].children[1].children[1].style.color = 'red';
                        }
                        if(movies[i].children[1].children[1].textContent < 8 && movies[i].children[1].children[1].textContent > 5) {
                            movies[i].children[1].children[1].style.color = 'orange';
                        }
                        if(movies[i].children[1].children[1].textContent > 8) {
                            movies[i].children[1].children[1].style.color = 'green';
                        }
                    }

                }

                let images = document.querySelectorAll('img');

                for(let i = 0; i < images.length; i++) {
                    images[i].addEventListener('mouseover', () => {

                        let clicked_movie = images[i].parentElement.getAttribute('id');

                        for(let i = 0; i < results.length; i++) {
                            if(results[i].id == clicked_movie) {
                                let overview = results[i].overview;
                                
                                if(overview !== '') {
                                    let new_overview = '';
                                    /** LENGTH OF OVERVIEW : 250 MAX */
                                    if(overview.length > 239) {
                                        new_overview = overview.substr(0, 238);
                                        new_overview = new_overview + '...';
                                    } else {
                                        new_overview = overview;
                                    }
                                    images[i].parentElement.lastChild.previousSibling.innerHTML = `<b>Overview</b> <br><br> ${new_overview}`;
                                    images[i].parentElement.lastChild.previousSibling.classList.remove('hide');
                                    images[i].parentElement.lastChild.previousSibling.classList.add('overview');
                                }
                            }
                        }
                    });
                    images[i].addEventListener('mouseout', () => {
                        let clicked_movie = images[i].parentElement.getAttribute('id');

                        for(let i = 0; i < results.length; i++) {
                            if(results[i].id == clicked_movie) {
                                images[i].parentElement.lastChild.previousSibling.classList.remove('overview');
                                images[i].parentElement.lastChild.previousSibling.classList.add('hide');
                            }
                        }
                    });
                }

            })
    }


});