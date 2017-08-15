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

    const lastUpdatedView = new LastUpdatedView(document.querySelector('#status .lastUpdated'));

    const networkIndicator = new NetworkIndicatorView(document.querySelector('#status .networkIndicator'));

    const sleepyContainer = document.querySelector('#zzz');
    const ruterView = new RuterView({
        el: document.querySelector('#departures'),
        stopConfig: stopConfig,
        lastUpdatedView: lastUpdatedView,
        networkIndicator: networkIndicator,
        config: stopConfig
    });
    const weatherView = new WeatherView(document.querySelector('#weather'));

    const mainViews = [ weatherView, ruterView ];

    const navigationContainer = document.querySelector('#ruter-navigation');
    const waker = document.querySelector('#sleeper');
    const minutesBeforeSleeping = 30;

    waker.addEventListener('click', wake);

    window.addEventListener("hashchange", function (e) {
        const url = e.newURL.split('#')[1];

        wake();
        modules.utils.clearIntervals();

        if (url.startsWith("/weather")) {
            weatherView.setLocationFromPath(url);
            showOnly(weatherView);
        } else {
            ruterView.setLocationFromPath(url);
            showOnly(ruterView);
        }
    });

    navigationContainer.innerHTML = stopsToHtml(stopConfig.stops);

    let sleepTimerId;
    function wake() {
        clearTimeout(sleepTimerId); // Always clear existing before setting up new timeout, to avoid old survivors messing stuff up.
        sleepTimerId = setTimeout(sleep, minutesBeforeSleeping * 60 * 1000);
    }

    function sleep() {
        modules.utils.clearIntervals();
        showOnly(sleepyContainer);
    }

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