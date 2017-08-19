class SleepyView {


    constructor(el) {
        this.el = el;
    }

    sleepIn(time, opts) {
        this.hide();
        clearTimeout(this.sleepTimerId); // Clear any existing attempt to sleep
        this.sleepTimerId = setTimeout(opts.onSleep, modules.utils.toMillis(time));
    }

    setPreviousUrl(url) {
        this.previousUrl = url;
    }

    show() {
        this.el.style['display'] = 'block';
        this.el.innerHTML = `<a href="#${this.previousUrl || ''}" id="sleeper">😴</a>`;
    }

    hide() {
        this.el.style['display'] = 'none';
    }
}