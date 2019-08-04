class RealtimeView {

    constructor(opts) {
        this.el = opts.el;
        this.networkIndicator = opts.networkIndicator;
        this.stopConfig = opts.stopConfig;
        this.refreshInterval = [30, 'seconds'];
    }

    setLocationFromPath(path) {
        this.currentStopConfig = this.parseStopFromPath(path);
    }

    show() {
        this.el.style['display'] = 'block';
        modules.utils.enableInterval(() => this.refreshTimes(), modules.utils.toMillis(this.refreshInterval));
    }

    hide() {
        this.el.innerHTML = '';
        this.el.style['display'] = 'none';
    }


    refreshTimes() {
        this.networkIndicator.loading();

        fetch('/realtime?stopId=' + this.currentStopConfig.id, {
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            this.networkIndicator.done();
            return response;
        }).then((response) => {
            return response.json();
        }).then((json) => {
            let html = `<div class="realtime number-grid">`;
            Object.keys(this.currentStopConfig.quays).forEach((quay) => {
                let quayConfig = this.currentStopConfig.quays[quay];

                const departuresFromQuay = json['departures']
                    .filter(function(departure) { return departure['quayId'] === quay })
                    .filter(function(departure) { return quayConfig.lines.includes(departure['lineId']) })
                    .filter(function(departure) { return departure['waitingTimeInMinutes'] >= quayConfig.minTime })
                    .filter(function(departure, index) { return index < quayConfig.maxDepartures });
                html += RealtimeView.departuresToHtml(departuresFromQuay, quayConfig);
            });

            html += `</div>`;

            this.el.innerHTML = html;
        }).catch((error) => {
            console.error('Klikk bæng i henting av sanntidsdata', error);
            this.networkIndicator.failed('Siste oppdatering feilet ☠☠☠');
        });
    }


    static departuresToHtml(departures, config) {
        let html = `<div class="direction"><h2 class="direction-heading number-grid-row-heading">${config.name}</h2>`;
        if (departures.length > 0) {
            html += `<div class="departures number-grid-row">`;
            html += departures.map(RealtimeView.departureToHtml).join('');
            html += `</div>`;
        } else {
            html += '<div class="row-text">Fant ingenting! 😚</div>';
        }
        html += `</div>`;
        return html;
    }

    static departureToHtml(departure) {
        return `<div class="departure number-grid-entry">
        <span class="time number-grid-number">${departure['waitingTimeInMinutes']}</span>
        <span class="line number-grid-detail">${departure['destinationName']} (${departure['localLineId']})</span>
    </div>`;
    }

    parseStopFromPath(path) {
        let match = path.match(/\/stop\/(\d+)/);
        const defaultStop = this.stopConfig.stops[0];

        if (match === null) {
            alert(`Fikk en rar URL: ${path}. Den er det lite å bruke til! 😩`);
            return defaultStop;
        }

        const stopIndex = match[1];
        const stop = this.stopConfig.stops[stopIndex];

        if (stop === undefined) {
            alert(`Fant ikke konfigurasjon med indeks ${stopIndex} 😰`);
            return defaultStop;
        }

        return stop;
    }

}
