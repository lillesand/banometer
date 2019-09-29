class WineSyncView {

    constructor(opts) {
        this.el = opts.el;
        this.networkIndicator = opts.networkIndicator;
        this.reloadFunc = opts.reload;
    }

    render(winesToSync, generatedId) {
        this.generatedId = generatedId;

        const newWines = winesToSync['newWines'].map((wine) => `<li>${wine['numberOfBottles']} ${wine['wineName']}</li>`);
        const changedAmount = winesToSync['changedAmount'].map((wine) => `<li>${wine['oldAmount']} ➜ ${wine['newAmount']} ${wine['wineName']}</li>`);
        const drunkWines = winesToSync['drunkWines'].map((wine) => `<li>${wine['numberOfBottles']} ${wine['wineName']}`);

        this.el.innerHTML = this.winesToBeSyncedHtml(newWines, changedAmount, drunkWines);

        this.el.querySelector('.sync-wines').addEventListener('submit', this.syncWinesListener.bind(this))
    }

    winesToBeSyncedHtml(newWines, changedAmount, drunkWines) {
        const syncWinesHtml = `<form class="sync-wines"><button>Kjør synk!</button></form>`;
        const newWineHtml = newWines.length === 0 ? '' : `<h3>Ny vin</h3><ul class="basic-list wine-list">${newWines.join('\n')}</ul>`;
        const changedAmountHtml = changedAmount.length === 0 ? '' : `<h3>Endret antall</h3><ul class="basic-list wine-list">${changedAmount.join('\n')}</ul>`;
        const drunkWineHtml = drunkWines.length === 0 ? '' : `<h3>Tomt</h3><ul class="basic-list wine-list">${drunkWines.join('\n')}</ul>`;

        return `
            ${syncWinesHtml}
            <div class="wine-updates">
                <p class="page-notice">Mangler synk mellom Vivino og AirTable.</p>
                ${newWineHtml}
                ${changedAmountHtml}
                ${drunkWineHtml}
            </div>`;
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
            this.reloadFunc();
        }).catch((error) => {
            console.error(error);
            alert('Synk feilet :(');
            this.reloadFunc();
        });
    }


}
