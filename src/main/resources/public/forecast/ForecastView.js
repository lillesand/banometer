class ForecastView {


    constructor(opts) {
        this.el = opts.el;
        this.networkIndicator = opts.networkIndicator;
        this.refreshInterval = [10, 'minutes'];
    }

    /**
     * @param location Location as used by yrs Meteograf API, e.g. `Norway/Oslo/Oslo/Nydalen`.
     */
    setLocation(location) {
        this.location = location;
    }

    setLocationFromPath(hash) {
        let match = hash.match(/\/forecast\/(.*)/);

        if (match === null) {
            alert(`Klarte ikke hente lokasjon fra vær-URL: ${hash}. Da blir det Oslo!`);
            return 'Oslo/Oslo/Oslo';
        }

        this.setLocation(match[1]);
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

        this.el.innerHTML = `<img class="meteogram" src="/place/${this.location}/meteogram.svg?cachebust=${new Date().getTime()}">`;

        let img = this.el.querySelector('img');
        img.addEventListener('load', () => {
            this.networkIndicator.done();
        });

        img.addEventListener('error', () => {
            this.networkIndicator.failed('Fikk feil fra Yr ☁️😭');
        });
    }

}
