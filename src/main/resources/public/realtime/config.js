window.modules.realtime.config = {
    stops: [
        { name: 'T-bane sentrum',
            symbol: '🚇',
            id: 'NSR:StopPlace:6073',
            quays: {
                'NSR:Quay:11151': {
                    minTime: 1,
                    maxDepartures: 4,
                    name: '👈 Vest',
                    lines: ['RUT:Line:4', 'RUT:Line:5']
                },
                'NSR:Quay:11153': {
                    minTime: 1,
                    maxDepartures: 4,
                    name: 'Øst 👉',
                    lines: ['RUT:Line:5']
                }
            }
        },
        { name: 'T-bane RiksTV',
            symbol: '📺',
            id: 'NSR:StopPlace:6073',
            quays: {
                'NSR:Quay:11153': {
                    minTime: 1,
                    maxDepartures: 4,
                    name: 'Vestli 🚀',
                    lines: ['RUT:Line:4']
                }
            }
        },
        { name: 'Godals vei',
            symbol: '⛷',
            id: 'NSR:StopPlace:6193',
            quays: {
                'NSR:Quay:11367': {
                    minTime: 2,
                    maxDepartures: 4,
                    name: 'Brekkekrysset and beyond 🌲',
                    lines: ['RUT:Line:54', 'RUT:Line:51']
                }
            }
        },
    ]
};
