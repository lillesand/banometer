(function() {

    const modules = window.modules;

    const timeAwake = [30, 'minutes'];

    const lastUpdatedView = new LastUpdatedView(document.querySelector('#status .lastUpdated'));
    const networkIndicator = new NetworkIndicatorView(document.querySelector('#status .networkIndicator'));
    const sleepyView = new SleepyView(document.querySelector('#zzz'));
    const weatherView = new WeatherView(document.querySelector('#weather'));

    const ruterMenuView = new RuterMenuView({
        el: document.querySelector('#ruter-navigation'),
        stopConfig: window.modules.ruter.config.stops
    });
    const ruterView = new RuterView({
        el: document.querySelector('#departures'),
        stopConfig: window.modules.ruter.config,
        lastUpdatedView: lastUpdatedView,
        networkIndicator: networkIndicator
    });

    const mainViews = [ weatherView, ruterView, sleepyView ];
    ruterMenuView.show();


    window.addEventListener("hashchange", function (e) {
        const url = e.newURL.split('#')[1];

        modules.utils.clearIntervals();

        if (url.startsWith("/sleep")) {
            showOnly(sleepyView);
            return;
        }

        sleepyView.setPreviousUrl(url);
        sleepyView.sleepIn(timeAwake, { onSleep: () => window.location.hash = '/sleep' });

        if (url.startsWith("/weather")) {
            weatherView.setLocationFromPath(url);
            showOnly(weatherView);
        } else {
            ruterView.setLocationFromPath(url);
            showOnly(ruterView);
        }
    });

    function showOnly(view) {
        mainViews.forEach(view => view.hide());
        view.show();
    }

})();