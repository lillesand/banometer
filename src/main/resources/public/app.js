(function() {

    const modules = window.modules;

    const timeAwake = [30, 'minutes'];

    const networkIndicator = new NetworkIndicatorView(document.querySelector('#status'));
    const sleepyView = new SleepyView(document.querySelector('#zzz'));

    const forecastView = new ForecastView({
        el: document.querySelector('#forecast'),
        networkIndicator: networkIndicator,
    });

    const realtimeMenuView = new RealtimeMenuView({
        el: document.querySelector('#realtime-navigation'),
        stops: window.modules.realtime.config.stops
    });

    const realtimeView = new RealtimeView({
        el: document.querySelector('#departures'),
        stopConfig: window.modules.realtime.config,
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

    const temperatureView = new TemperatureView({
        el: document.querySelector('#temperature'),
        networkIndicator: networkIndicator
    });

    const wineView = new WineView({
        el: document.querySelector('#wine'),
        networkIndicator: networkIndicator
    });


    const mainViews = [ forecastView, realtimeView, sleepyView, maintenanceView, cinemaView, temperatureView, wineView ];
    realtimeMenuView.show();

    window.addEventListener("hashchange", function (e) {
        render(e.newURL.split('#')[1]);
    });

    render(window.location.hash.substring(1)); // Render initial path, omitting leading #

    function render(url) {
        modules.utils.clearIntervals();

        if (url === '' || url === '/') {
            // Default to first stop
            url = RealtimeMenuView.pathToFirstStop();
        }

        if (url.startsWith("/sleep")) {
            showOnly(sleepyView);
            return;
        }

        sleepyView.setPreviousUrl(url);
        sleepyView.sleepIn(timeAwake, {onSleep: () => window.location.hash = '/sleep'});

        if (url.startsWith("/forecast")) {
            forecastView.setLocationFromPath(url);
            showOnly(forecastView);
        } else if (url.startsWith('/stop')) {
            realtimeView.setLocationFromPath(url);
            showOnly(realtimeView);
        } else if (url.startsWith('/maintenance')) {
            showOnly(maintenanceView);
        } else if (url.startsWith('/cinema')) {
            showOnly(cinemaView);
        } else if (url.startsWith('/temperature')) {
            showOnly(temperatureView);
        } else if (url.startsWith('/wine')) {
            showOnly(wineView);
        } else {
            alert(`Jøss, '${url}' var jammen en pussig URL. Den vet ikke jeg hva jeg skal gjøre med! 😬`);
        }
    }

    function showOnly(view) {
        mainViews.forEach(view => view.hide());
        view.show();
    }

    dragscroll(document.querySelector('#main'));

    if (navigator.userAgent.includes('X11')) {
        // No cursor on x11 (which in practice means RasPi)
        document.body.style['cursor'] = 'none';
    }

})();
