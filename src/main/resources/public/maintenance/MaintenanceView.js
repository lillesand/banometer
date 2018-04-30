class MaintenanceView {



    constructor(opts) {
        this.el = opts.el;
        this.networkIndicator = opts.networkIndicator;

        this.template = `
<ul>
    <li><a href="/maintenance/pull" id="git-pull">🏋️‍♀️ git pull</a></li>
    <li><a href="/maintenance/build" id="gradle-build">🛠 gradle build</a></li>
    <li><a href="/maintenance/restart" id="restart-app">♻️ restart backend</a></li>
    <li><a href="#" id="reload-app">🛀 refresh</a></li>
</ul>
`;
    }

    show() {
        this.el.style['display'] = 'block';
        this.el.innerHTML = this.template;

        this.el.querySelector('#git-pull').addEventListener('click', this.postToHref(text => alert(text)));
        this.el.querySelector('#gradle-build').addEventListener('click', this.postToHref(text => alert(text)));
        this.el.querySelector('#reload-app').addEventListener('click', () => window.location.reload());

        this.el.querySelector('#restart-app').addEventListener('click', this.postToHref(this.pollForRestart));
    }

    hide() {
        this.el.innerHTML = '';
        this.el.style['display'] = 'none';
    }

    pollForRestart() {
        this.restartCounter = 0;
        setInterval(() => {
            fetch('/maintenance/up')
                .then(() => {
                    alert("Allrighty, we're back online! Restarting.");
                    window.location.reload();
                })
                .catch(() => {
                    this.networkIndicator.status(this.restartCounter++);
                })
        }, 1000)
    }

    postToHref(onResult) {
        return e => {
            e.preventDefault();
            fetch(e.target.getAttribute('href'), { method: 'POST'} )
                .then(response => response.text())
                .then(text => onResult.call(this, text))
                .catch(reason => alert(reason));
        }

    }

}