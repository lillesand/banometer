class TemperatureView {


    constructor(opts) {
        this.el = opts.el;
        this.networkIndicator = opts.networkIndicator;
        this.refreshInterval = [10, 'minutes'];
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

        fetch('/temperature', {
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => {
            this.networkIndicator.done();
            return res;
        }).then((res) => {
            return res.json();
        }).then(json => {
            this.el.innerHTML = `<div class="temperature number-grid">

    <div class="temperature-indoor">
        <h2 class="number-grid-row-heading">Inne 🌱</h2>
        <div class="number-grid-row">
            <div class="temperature number-grid-entry">
                <span class="number-grid-number">${json['indoor']['temperature']} &deg;c</span>
            </div>
            <div class="humidity number-grid-entry">
                <span class="number-grid-number number-grid-entry">${json['indoor']['humidity']}%</span>
                <span class="number-grid-detail">luftfuktighet</span>
            </div>
        </div>
    </div>    
    
    <div class="temperature-outdoor">
        <h2 class="number-grid-row-heading">Ute 😎</h2>
        <div class="number-grid-row">
            <div class="temperature number-grid-entry">
                <span class="number-grid-number">${json['outdoor']['temperature']} &deg;c</span>
            </div>
            <div class="humidity number-grid-entry">
                <span class="number-grid-number number-grid-entry">${json['outdoor']['humidity']}%</span>
                <span class="number-grid-detail">luftfuktighet</span>
            </div>
        </div>
    </div>

</div>`;
        }).catch((error) => {
            console.error('Klikk bæng i henting av temperatur', error);
            this.networkIndicator.failed('Siste oppdatering feilet ☠☠☠');
        });
    }

}
