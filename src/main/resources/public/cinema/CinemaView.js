class CinemaView {


    constructor(opts) {
        this.el = opts.el;
        this.networkIndicator = opts.networkIndicator;
        this.refreshInterval = [30, 'minutes'];
    }

    show() {
        this.el.style['display'] = 'block';
        modules.utils.enableInterval(() => this.refresh(), modules.utils.toMillis(this.refreshInterval));
    }

    hide() {
        this.el.innerHTML = '';
        this.el.style['display'] = 'none';
    }

    refresh() {
        this.networkIndicator.loading();
        fetch('/movies', {
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            this.networkIndicator.done();
            return response;
        }).then((response) => {
            return response.json();
        }).then((json) => {
            window.response = json;

            let movies = json['movies'];
            let screens = Object.keys(movies);

            let html = '';
            screens.forEach(screen => {
                html += '<div class="screen">';
                html += `<h2>${screen}</h2>`;
                let days = Object.keys(movies[screen]);

                days.forEach((day) => {
                    html += `<h3>${day}</h3>`;
                    html += `<ul>`;

                    movies[screen][day].forEach((movie) => {
                        html += `<li><span class="time">${movie['displayTime']}</span><span class="title">${movie['show']}</span><span class="free-seats">${movie['freeSeats']}</span></li>`;
                    });

                    html += `</ul>`;
                });
                html += '</div>';
            });

            this.el.innerHTML = html;
        }).catch((error) => {
            console.error('Klikk bæng i henting fra odeon', error);
            this.networkIndicator.failed('Siste oppdatering feilet ☠☠☠');
        });
    }

}
