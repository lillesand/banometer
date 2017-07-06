const departuresContainer = document.querySelector('#departures');

fetch('/ruter', {
    headers: {
        'Accept': 'application/json'
    }
}).then(function(response) {
    return response.json();
}).then(function(json) {

    let html = `<div class="departures">`;
    json.departures.forEach(function(departure) {
        html += `<div class="departure">
    <span class="time">${departure.waitingTimeInMinutes}</span>
    <span class="line">${departure.destinationName} (${departure.lineName})</span>
</div>`
    });
    html += `</div>`;

    departuresContainer.innerHTML = html;
});