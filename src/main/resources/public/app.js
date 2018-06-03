(function() {

    const modules = window.modules;

    const timeAwake = [30, 'minutes'];

    const networkIndicator = new NetworkIndicatorView(document.querySelector('#status'));
    const sleepyView = new SleepyView(document.querySelector('#zzz'));

    const weatherView = new WeatherView({
        el: document.querySelector('#weather'),
        networkIndicator: networkIndicator,
    });

    const ruterMenuView = new RuterMenuView({
        el: document.querySelector('#ruter-navigation'),
        stops: window.modules.ruter.config.stops
    });

    const ruterView = new RuterView({
        el: document.querySelector('#departures'),
        stopConfig: window.modules.ruter.config,
        networkIndicator: networkIndicator
    });

    const maintenanceView = new MaintenanceView({
        el: document.querySelector('#maintenance'),
        networkIndicator: networkIndicator
    });

    const cinemaView = new CinemaView({
        el: document.querySelector('#cinema'),
        networkIndicator: networkIndicator
    });



    const mainViews = [ weatherView, ruterView, sleepyView, maintenanceView, cinemaView ];
    ruterMenuView.show();

    window.addEventListener("hashchange", function (e) {
        render(e.newURL.split('#')[1]);
    });

    render(window.location.hash.substring(1)); // Render initial path, omitting leading #

    function render(url) {
        modules.utils.clearIntervals();

        if (url === '' || url === '/') {
            // Default to first stop
            url = RuterMenuView.pathToFirstStop();
        }

        if (url.startsWith("/sleep")) {
            showOnly(sleepyView);
            return;
        }

        sleepyView.setPreviousUrl(url);
        sleepyView.sleepIn(timeAwake, {onSleep: () => window.location.hash = '/sleep'});

        if (url.startsWith("/weather")) {
            weatherView.setLocationFromPath(url);
            showOnly(weatherView);
        } else if (url.startsWith('/stop')) {
            ruterView.setLocationFromPath(url);
            showOnly(ruterView);
        } else if (url.startsWith('/maintenance')) {
            showOnly(maintenanceView);
        } else if (url.startsWith('/cinema')) {
            showOnly(cinemaView);
        } else {
            alert(`Jøss, '${url}' var jammen en pussig URL. Den vet ikke jeg hva jeg skal gjøre med! 😬`);
        }
    }

    function showOnly(view) {
        mainViews.forEach(view => view.hide());
        view.show();
    }

})();