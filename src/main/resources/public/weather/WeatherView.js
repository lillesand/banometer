class WeatherView {


    constructor(el) {
        this.el = el;
        this.refreshInterval = 15;
    }

    /**
     * @param location Location as used by yrs Meteograf API, e.g. `Norway/Oslo/Oslo/Nydalen`.
     */
    setLocation(location) {
        this.location = location;
    }

    setLocationFromPath(hash) {
        let match = hash.match(/\/weather\/(.*)/);

        if (match === null) {
            alert(`Klarte ikke hente lokasjon fra vær-URL: ${hash}. Da blir det Oslo!`);
            return 'Oslo/Oslo/Oslo';
        }

        this.setLocation(match[1]);
    }

    show() {
        this.el.style['display'] = 'block';
        modules.utils.enableInterval(() => this.refresh(), this.refreshInterval * 60 * 1000);
    }

    hide() {
        this.el.innerHTML = '';
        this.el.style['display'] = 'none';
    }

    refresh() {
        this.el.innerHTML = `<img src="https://www.yr.no/place/${this.location}/meteogram.svg">`;
    }

}