class RuterMenuView {

    constructor(opts) {
        this.el = opts.el;
        this.stopConfig = opts.stopConfig;
    }

    show() {
        this.el.innerHTML = RuterMenuView.stopsToHtml(this.stopConfig);
    }

    static stopsToHtml(stops) {
        return stops.map(function(stop) {
            return `<a class="nav-item" href="#/stop/${stop.id}"><span class="icon">${stop.symbol}</span><span class="name">${stop.name}</span></a>`;
        }).join('');
    }

}