class RuterView {

    constructor(opts) {
        this.el = opts.el;
        this.lastUpdatedView = opts.lastUpdatedView;
        this.networkIndicator = opts.networkIndicator;
        this.stopConfig = opts.stopConfig;
        this.refreshInterval = 30;
    }

    setLocationFromPath(path) {
        this.currentStopConfig = this.parseStopFromPath(path);
    }

    show() {
        this.el.style['display'] = 'block';
        modules.utils.enableInterval(() => this.refreshTimes(), this.refreshInterval * 1000);
    }

    hide() {
        this.el.style['display'] = 'none';
    }


    refreshTimes() {
        this.networkIndicator.loading();

        fetch('/ruter?stopId=' + this.currentStopConfig.id, {
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            this.networkIndicator.done();
            return response;
        }).then((response) => {
            return response.json();
        }).then((json) => {
            let html = '';
            Object.keys(this.currentStopConfig.directions).forEach((direction) => {
                let directionConfig = this.currentStopConfig.directions[direction];

                const departuresInDirection = json['departures']
                    .filter(function(departure) { return departure['directionName'] === direction })
                    .filter(function(departure) { return directionConfig.lines.includes(departure['lineName']) })
                    .filter(function(departure) { return departure['waitingTimeInMinutes'] >= directionConfig.minTime })
                    .filter(function(departure, index) { return index < directionConfig.maxDepartures });
                html += RuterView.departuresToHtml(departuresInDirection, directionConfig);
            });

            this.el.innerHTML = html;
            this.lastUpdatedView.update();
        }).catch((error) => {
            console.error('Klikk bæng i henting fra ruter', error);
            this.networkIndicator.failed('Siste oppdatering feilet ☠☠☠');
        });
    }


    static departuresToHtml(departures, config) {
        let html = `<div class="direction"><h2 class="direction-heading">${config.name}</h2>`;
        if (departures.length > 0) {
            html += `<div class="departures">`;
            html += departures.map(RuterView.departureToHtml).join('');
            html += `</div>`;
        } else {
            html += '<div class="error">Fant ingenting! 😚</div>';
        }
        html += `</div>`;
        return html;
    }

    static departureToHtml(departure) {
        return `<div class="departure">
        <span class="time">${departure['waitingTimeInMinutes']}</span>
        <span class="line">${departure['destinationName']} (${departure['lineName']})</span>
    </div>`;
    }

    parseStopFromPath(path) {
        let match = path.match(/\/stop\/(\d+)/);
        const defaultStop = this.stopConfig.stops[0];

        if (match === null) {
            alert(`Fikk en rar URL: ${path}. Den er det lite å bruke til! 😩`);
            return defaultStop;
        }

        const stopId = match[1];
        const stop = this.stopConfig.stops.find(function (stop) {
            return stop.id === stopId;
        });

        if (stop === undefined) {
            alert(`Fant ikke konfigurasjon for stopID ${stopId} 😰`);
            return defaultStop;
        }

        return stop;
    }

}