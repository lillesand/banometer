class SleepyView {

    constructor(el) {
        this.el = el;
    }

    show() {
        this.el.style['display'] = 'block';
    }

    hide() {
        this.el.style['display'] = 'none';
    }

}