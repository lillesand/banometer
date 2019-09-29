class WineStatsView {

    constructor(opts) {
        this.el = opts.el;
        this.viewCounter = 0;
    }

    highestRated(stats) {
        const winesHtml = stats['highestRated'].map((wine) => `<li>${wine['rating']} - ${wine['wineName']} (${wine['numberOfBottles']} flasker)</li>`);
        return `<h3>Høyest rangerte</h3><ul class="basic-list wine-list">${winesHtml.join('\n')}</ul>`;
    }

    mostCollected(stats) {
        const winesHtml = stats['mostCollected'].map((wine) => `<li>${wine['numberOfBottles']} flasker - ${wine['wineName']} (${wine['vintages']})</li>`);
        return `<h3>Mest samlet</h3><ul class="basic-list wine-list">${winesHtml.join('\n')}</ul>`;
    }

    recentlyScanned(stats) {
        const winesHtml = stats['mostRecentlyScanned'].map((wine) => `<li>${wine['wineName']}</li>`);
        return `<h3>Siste viner</h3><ul class="basic-list wine-list">${winesHtml.join('\n')}</ul>`;
    }

    render(stats) {
        window.modules.utils.enableInterval(() => {
            this.viewCounter++;
            switch (this.viewCounter % 3) {
                case 0: this.el.innerHTML = this.mostCollected(stats); break;
                case 1: this.el.innerHTML = this.mostCollected(stats); break;
                case 2: this.el.innerHTML = this.recentlyScanned(stats); break;
            }
        }, modules.utils.toMillis([30, 'seconds']));
    }
}
