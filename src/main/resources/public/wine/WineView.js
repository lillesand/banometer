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

    syncWinesListener(e) {
        e.preventDefault();
        this.networkIndicator.loading();

        fetch('/update_wines', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `generatedId=${encodeURIComponent(this.generatedId)}`
        }).then(res => {
            if (res.status !== 200) {
                throw `Got non 200 status code: ${res.status}`
            }
        }).then(() => {
            alert('Okee dokee, sync done.');
            this.refresh();
        }).catch((error) => {
            console.error(error);
            alert('Synk feilet :(');
            this.refresh();
        });
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
            this.generatedId = json['generatedId'];

            const newWines = json['diff']['newWines'].map((wine) => `<li>${wine['numberOfBottles']} ${wine['wineName']}</li>`);
            const changedAmount = json['diff']['changedAmount'].map((wine) => `<li>${wine['oldAmount']} ➜ ${wine['newAmount']} ${wine['wineName']}</li>`);
            const drunkWines = json['diff']['drunkWines'].map((wine) => `<li>${wine['numberOfBottles']} ${wine['wineName']}`);

            this.el.innerHTML = this.winesToBeSyncedHtml(newWines, changedAmount, drunkWines);

            this.el.querySelector('.sync-wines').addEventListener('submit', this.syncWinesListener.bind(this))
        }).catch((error) => {
            console.error('Feilet', error);
            this.networkIndicator.failed('Siste oppdatering feilet ☠☠☠');
        });
    }

    winesToBeSyncedHtml(newWines, changedAmount, drunkWines) {
        const syncWinesHtml = `<form class="sync-wines"><button>Sync wines</button></form>`;
        const newWineHtml = newWines.length === 0 ? '' : `<h3>Ny vin</h3><ul class="basic-list wine-list">${newWines.join('\n')}</ul>`;
        const changedAmountHtml = changedAmount.length === 0 ? '' : `<h3>Endret antall</h3><ul class="basic-list wine-list">${changedAmount.join('\n')}</ul>`;
        const drunkWineHtml = drunkWines.length === 0 ? '' : `<h3>Tomt</h3><ul class="basic-list wine-list">${drunkWines.join('\n')}</ul>`;

        return `
    ${syncWinesHtml}
    <div class="wine-updates">
        ${newWineHtml}
        ${changedAmountHtml}
        ${drunkWineHtml}
    </div>`;
    }
}
