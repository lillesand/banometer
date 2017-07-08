
    const departuresContainer = document.querySelector('#departures');
    const sleepyContainer = document.querySelector('#zzz');
    const waker = document.querySelector('#sleeper');
    const networkIndicator = document.querySelector('#status .networkIndicator');
    const lastUpdated = document.querySelector('#status .lastUpdated');
    const minutesBeforeSleeping = 30;
    const secondsRefreshInterval = 30;

    let refreshInterval;

    waker.addEventListener('click', function() {
        enableRefresh();

        setTimeout(disableRefresh, minutesBeforeSleeping * 60 * 1000);
    });


    function enableRefresh() {
        refreshTimes();
        refreshInterval = setInterval(refreshTimes, secondsRefreshInterval * 1000);

        sleepyContainer.style['display'] = 'none';
        departuresContainer.style['display'] = 'block';
    }

    function disableRefresh() {
        clearInterval(refreshInterval);

        sleepyContainer.style['display'] = 'block';
        departuresContainer.style['display'] = 'none';
    }

    function refreshTimes() {
        networkIndicator.innerText = '🤖 ⚡️ ☁️';
        fetch('/ruter', {
            headers: {
                'Accept': 'application/json'
            }
        }).then(function(response) {
            networkIndicator.innerText = '';
            return response;
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            const directions = {
                '1': {
                    minTime: 4,
                    name: '👈 Vest',
                    lines: ['4', '5']
                },
                '2': {
                    minTime: 4,
                    name: 'Øst 👉',
                    lines: ['5']
                }
            };

            let html = ``;

            Object.keys(directions).forEach(function(direction) {
                let directionConfig = directions[direction];

                const departuresInDirection = json.departures
                    .filter(function(departure) { return departure.directionName === direction })
                    .filter(function(departure) { return directionConfig.lines.includes(departure.lineName) })
                    .filter(function(departure) { return departure.waitingTimeInMinutes >= directionConfig.minTime })

                html += `<div class="direction"><h2 class="direction-heading">${directionConfig.name}</h2>`;
                if (departuresInDirection.length > 0) {
                    html += `<div class="departures">`;
                        html += departuresInDirection.map(departureToHtml).join('');
                    html += `</div>`;
                } else {
                    html += '<div class="error">Fant ingenting! 😚</div>';
                }
                html += `</div>`;
            });

            departuresContainer.innerHTML = html;
            lastUpdated.innerText = dateString(new Date());
        }).catch(function (error) {
            console.error('Klikk bæng i henting fra ruter', error);
            networkIndicator.innerText = '☠☠☠';
            lastUpdated.innerText = 'Oppdatering 💥😩';
        });
    }


    function departureToHtml(departure) {
        return `<div class="departure">
    <span class="time">${departure.waitingTimeInMinutes}</span>
    <span class="line">${departure.destinationName} (${departure.lineName})</span>
</div>`;
    }

    function dateString(date) {
        return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date.getUTCDay().toString().padStart(2, '0')} ${date.toLocaleTimeString()}`;
    }