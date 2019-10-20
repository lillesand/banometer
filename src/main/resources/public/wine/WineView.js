class WineView {

    constructor(opts) {
        this.el = opts.el;
        this.networkIndicator = opts.networkIndicator;
        this.refreshInterval = [10, 'minutes'];
        this.wineSyncView = new WineSyncView({ el: this.el, networkIndicator: this.networkIndicator, reload: this.refresh });
        this.wineStatsView = new WineStatsView({ el: this.el });
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
            let winesToSync = json['wineStatus']['diff'];
            if (winesToSync['numberOfBottlesNeedSync'] > 0) {
                this.wineSyncView.render(winesToSync, json['generatedId']);
            } else {
                this.wineStatsView.render(json['wineStatus']['stats'])
            }
        }).catch((error) => {
            console.error('Feilet', error);
            this.networkIndicator.failed('Siste oppdatering feilet ☠☠☠');
        });
    }

}
