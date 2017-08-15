(function() {

    const modules = window.modules;

    const stopConfig = {
        stops: [
            { name: 'Nydalen T',
                symbol: '🚇',
                id: '3012130',
                directions: {
                    '1': {
                        minTime: 4,
                        maxDepartures: 4,
                        name: '👈 Vest',
                        lines: ['4', '5']
                    },
                    '2': {
                        minTime: 4,
                        maxDepartures: 4,
                        name: 'Øst 👉',
                        lines: ['5']
                    }
                }
            },
        { name: 'BI',
                symbol: '🏫',
                id: '3012131',
                directions: {
                    '1': {
                        minTime: 4,
                        maxDepartures: 4,
                        name: 'Byen 🌃',
                        lines: ['37']
                    }
                }
            },

            { name: 'Gullhaugveien',
                symbol: '🚌',
                id: '3012134',
                directions: {
                    '1': {
                        minTime: 4,
                        maxDepartures: 4,
                        name: 'Grefsenkollen 🌲',
                        lines: ['56B', '56']
                    },
                    '2': {
                        minTime: 4,
                        maxDepartures: 4,
                        name: 'Sentrum 🏙',
                        lines: ['30']
                    }
                }
            },
        ]
    };

    const timeAwake = [30, 'minutes'];

    const lastUpdatedView = new LastUpdatedView(document.querySelector('#status .lastUpdated'));
    const networkIndicator = new NetworkIndicatorView(document.querySelector('#status .networkIndicator'));
    const sleepyView = new SleepyView(document.querySelector('#zzz'));
    const weatherView = new WeatherView(document.querySelector('#weather'));
    const ruterView = new RuterView({
        el: document.querySelector('#departures'),
        stopConfig: stopConfig,
        lastUpdatedView: lastUpdatedView,
        networkIndicator: networkIndicator,
        config: stopConfig
    });


    const mainViews = [ weatherView, ruterView, sleepyView ];

    const navigationContainer = document.querySelector('#ruter-navigation');

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

    navigationContainer.innerHTML = stopsToHtml(stopConfig.stops);

    function showOnly(view) {
        mainViews.forEach(view => view.hide());
        view.show();
    }

    function stopsToHtml(stops) {
        return stops.map(function(stop) {
            return `<a class="nav-item" href="#/stop/${stop.id}"><span class="icon">${stop.symbol}</span><span class="name">${stop.name}</span></a>`;
        }).join('');
    }

})();