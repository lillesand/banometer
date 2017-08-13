(function() {

    window.modules.utils.enableInterval = enableInterval;
    window.modules.utils.clearIntervals = clearIntervals;

    let refreshIntervals = [];

    function enableInterval(func, interval) {
        func.call();
        refreshIntervals.push(setInterval(func, interval));
    }

    function clearIntervals() {
        refreshIntervals = [];
        refreshIntervals.forEach(clearInterval);
    }

})();