(function() {
    const config = {
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

    const departuresContainer = document.querySelector('#departures');
    const navigationContainer = document.querySelector('#navigation');
    const sleepyContainer = document.querySelector('#zzz');
    const waker = document.querySelector('#sleeper');
    const networkIndicator = document.querySelector('#status .networkIndicator');
    const lastUpdated = document.querySelector('#status .lastUpdated');
    const minutesBeforeSleeping = 30;
    const secondsRefreshInterval = 30;
    const defaultStop = config.stops[0];

    let currentStopConfig = defaultStop;

    waker.addEventListener('click', wake);
    window.addEventListener("hashchange", function (e) {
        const hashPortion = e.newURL.split('#')[1];
        currentStopConfig = findStopConfigFromHash(hashPortion, currentStopConfig, config, defaultStop);
        wake();
    });
    navigationContainer.innerHTML = stopsToHtml(config.stops);

    let refreshInterval;
    let sleepTimerId;
    function wake() {
        refreshTimes();

        clearInterval(refreshInterval); // Always clear existing before setting up new interval, to avoid multiple concurrent intervals.
        refreshInterval = setInterval(refreshTimes, secondsRefreshInterval * 1000);

        sleepyContainer.style['display'] = 'none';
        departuresContainer.style['display'] = 'block';

        clearTimeout(sleepTimerId); // Always clear existing before setting up new timeout, to avoid old survivors messing stuff up.
        sleepTimerId = setTimeout(sleep, minutesBeforeSleeping * 60 * 1000);
    }

    function sleep() {
        clearInterval(refreshInterval);

        sleepyContainer.style['display'] = 'block';
        departuresContainer.style['display'] = 'none';
    }

    function refreshTimes() {
        networkIndicator.innerText = '🤖 ⚡️ ☁️';
        networkIndicator.classList.remove('error');
        fetch('/ruter?stopId=' + currentStopConfig.id, {
            headers: {
                'Accept': 'application/json'
            }
        }).then(function(response) {
            networkIndicator.innerText = '';
            return response;
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            let html = '';
            Object.keys(currentStopConfig.directions).forEach(function(direction) {
                let directionConfig = currentStopConfig.directions[direction];

                const departuresInDirection = json.departures
                    .filter(function(departure) { return departure.directionName === direction })
                    .filter(function(departure) { return directionConfig.lines.includes(departure.lineName) })
                    .filter(function(departure) { return departure.waitingTimeInMinutes >= directionConfig.minTime })
                    .filter(function(departure, index) { return index < directionConfig.maxDepartures });
                html += departuresToHtml(departuresInDirection, directionConfig);
            });

            departuresContainer.innerHTML = html;
            lastUpdated.innerText = dateString(new Date());
        }).catch(function (error) {
            console.error('Klikk bæng i henting fra ruter', error);
            networkIndicator.innerText = 'Siste oppdatering feilet ☠☠☠';
            networkIndicator.classList.add('error');
        });
    }

    function findStopConfigFromHash(hash) {
        let match = hash.match(/\/stop\/(\d+)/);

        if (match === null) {
            alert(`Fikk en rar URL: ${hash}. Den er det lite å bruke til! 😩`);
            return defaultStop;
        }

        const stopId = match[1];
        const stopConfig = config.stops.find(function (stop) {
            return stop.id === stopId;
        });

        if (stopConfig === undefined) {
            alert(`Fant ikke konfigurasjon for stopID ${stopId} 😰`);
            return defaultStop;
        }

        return stopConfig;
    }


    function stopsToHtml(stops) {
        return stops.map(function(stop) {
            return `<a class="stop" href="#/stop/${stop.id}"><span class="emoji">${stop.symbol}</span><span class="name">${stop.name}</span></a>`;
        }).join('');
    }

    function departuresToHtml(departures, config) {
        let html = `<div class="direction"><h2 class="direction-heading">${config.name}</h2>`;
        if (departures.length > 0) {
            html += `<div class="departures">`;
            html += departures.map(departureToHtml).join('');
            html += `</div>`;
        } else {
            html += '<div class="error">Fant ingenting! 😚</div>';
        }
        html += `</div>`;
        return html;
    }

    function departureToHtml(departure) {
        return `<div class="departure">
    <span class="time">${departure.waitingTimeInMinutes}</span>
    <span class="line">${departure.destinationName} (${departure.lineName})</span>
</div>`;
    }

    function dateString(date) {
        return `${date.toLocaleTimeString()} (${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()})`;
    }

})();