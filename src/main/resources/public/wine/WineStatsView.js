class WineStatsView {

    constructor(opts) {
        this.el = opts.el;
    }

    render(stats) {
        const highestRated = stats['highestRated'].map((wine) => `<li>${wine['rating']} - ${wine['wineName']} (${wine['numberOfBottles']} flasker)</li>`);
        this.el.innerHTML = `<h3>Høyest rangerte</h3><ul class="basic-list wine-list">${highestRated.join('\n')}</ul>`;
    }

}
