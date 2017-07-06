(function() {

    const departuresContainer = document.querySelector('#departures');

    const departureConfig = {
        times: {
            tooLate: 3,
            lower: 5,
            upper: 30
        },
        max: 5
    };

    fetch('/ruter', {
        headers: {
            'Accept': 'application/json'
        }
    }).then(function(response) {
        return response.json();
    }).then(function(json) {

        let html = `<div class="departures">`;
        html += json.departures.map(departureToHtml).join('');
        html += `</div>`;

        departuresContainer.innerHTML = html;
    });

    function departureToHtml(departure) {
        return `<div class="departure">
    <span class="time">${departure.waitingTimeInMinutes}</span>
    <span class="line">${departure.destinationName} (${departure.lineName})</span>
</div>`;
    }

})();

