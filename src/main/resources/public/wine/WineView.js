class WineView {


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

        fetch('/wine_status', {
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => {
            this.networkIndicator.done();
            return res;
        }).then((res) => {
            return res.json();
        }).then(json => {
            console.log(json);
            const newWines = json['diff']['newWines'].map((wine) => `<li>${wine['numberOfBottles']} ${wine['wineName']}</li>`);
            const changedAmount = json['diff']['changedAmount'].map((wine) => `<li>${wine['oldAmount']} ➜ ${wine['newAmount']} ${wine['wineName']}</li>`);
            const drunkWines = json['diff']['drunkWines'].map((wine) => `<li>${wine['numberOfBottles']} ${wine['wineName']}`);

            this.el.innerHTML = `<div class="wine-updates">
    <h3>Ny vin</h3>
    <ul class="basic-list wine-list">${newWines.join('\n')}</ul>
    <h3>Endret antall</h3>
    <ul class="basic-list wine-list">${changedAmount.join('\n')}</ul>
    <h3>Tomt</h3>
    <ul class="basic-list wine-list">${drunkWines.join('\n')}</ul>
    
</div>`;
        }).catch((error) => {
            console.error('Klikk bæng i henting av temperatur', error);
            this.networkIndicator.failed('Siste oppdatering feilet ☠☠☠');
        });
    }

}
