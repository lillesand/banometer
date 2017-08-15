class NetworkIndicatorView {

    constructor(el) {
        this.el = el;
    }

    loading() {
        this.el.innerText = '🤖 ⚡️ ☁️';
        this.el.classList.remove('error');
    }

    done() {
        this.el.innerText = '';
    }

    failed(error) {
        this.el.innerText = error;
        this.el.classList.add('error');
    }

}