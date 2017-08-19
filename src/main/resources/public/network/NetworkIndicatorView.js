class NetworkIndicatorView {

    constructor(el) {
        this.lastUpdated = el.querySelector('.lastUpdated');
        this.networkIndicator = el.querySelector('.networkIndicator');
    }

    loading() {
        this.networkIndicator.innerText = '🤖 ⚡️ ☁️';
        this.networkIndicator.classList.remove('error');
    }

    done() {
        const date = new Date();
        this.lastUpdated.innerText = `${date.toLocaleTimeString()} (${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()})`;
        this.networkIndicator.innerText = '';
    }

    failed(error) {
        this.networkIndicator.innerText = error;
        this.networkIndicator.classList.add('error');
    }

}