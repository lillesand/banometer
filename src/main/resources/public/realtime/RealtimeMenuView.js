class RealtimeMenuView {

    constructor(opts) {
        this.el = opts.el;
        this.stops = opts.stops;
    }

    show() {
        this.el.innerHTML = RealtimeMenuView.stopsToHtml(this.stops);
    }

    static pathToFirstStop() {
        return `/stop/0`;
    }

    static stopsToHtml(stops) {
        return stops.map(function(stop, index) {
            return `<a class="nav-item" href="#/stop/${index}"><span class="icon">${stop.symbol}</span><span class="name">${stop.name}</span></a>`;
        }).join('');
    }

}
