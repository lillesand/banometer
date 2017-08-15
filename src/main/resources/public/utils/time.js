(function() {

    window.modules.utils.toMillis = function(time) {
        switch (time[1]) {
            case 'seconds': case 'second': return time[0] * 1000;
            case 'minutes': case 'minute': return time[0] * 60 * 1000;
            case 'hours': case 'hour': return time[0] * 60 * 60 * 1000;
        }
    }

}());