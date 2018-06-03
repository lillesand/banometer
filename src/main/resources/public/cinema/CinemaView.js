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
            let days = Object.keys(movies);

            console.log(typeof days, days.forEach);
            let html = '';
            days.forEach((day) => {
                html += `<h2>${day}</h2>`;
                html += `<ul>`;

                movies[day].forEach((movie) => {
                    html += `<li><span class="time">${movie['displayTime']}</span><span class="title">${movie['show']}</span><span class="free-seats">${movie['freeSeats']}</span></li>`;
                });

                html += `</ul>`;
            });

            this.el.innerHTML = html;
        }).catch((error) => {
            console.error('Klikk bæng i henting fra ruter', error);
            this.networkIndicator.failed('Siste oppdatering feilet ☠☠☠');
        });
    }

}