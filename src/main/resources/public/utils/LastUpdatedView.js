class LastUpdatedView {

    constructor(el) {
        this.el = el;
    }

    update() {
        let date = new Date();
        this.el.innerText = `${date.toLocaleTimeString()} (${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()})`;
    }
}