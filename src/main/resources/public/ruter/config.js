window.modules.ruter.config = {
    stops: [
        { name: 'T-bane sentrum',
            symbol: '🚇',
            id: '3012130',
            directions: {
                '1': {
                    minTime: 1,
                    maxDepartures: 4,
                    name: '👈 Vest',
                    lines: ['4', '5']
                },
                '2': {
                    minTime: 1,
                    maxDepartures: 4,
                    name: 'Øst 👉',
                    lines: ['5']
                }
            }
        },
        { name: 'T-bane RiksTV',
            symbol: '📺',
            id: '3012130',
            directions: {
                '2': {
                    minTime: 1,
                    maxDepartures: 4,
                    name: 'Vestli 🚀',
                    lines: ['4']
                }
            }
        },
        { name: 'BI',
            symbol: '🏫',
            id: '3012131',
            directions: {
                '1': {
                    minTime: 4,
                    maxDepartures: 4,
                    name: 'Byen 🌃',
                    lines: ['37']
                }
            }
        },
        { name: 'Godals vei',
            symbol: '⛷',
            id: '3012237',
            directions: {
                '2': {
                    minTime: 2,
                    maxDepartures: 4,
                    name: 'Brekkekrysset and beyond 🌲',
                    lines: ['54', '51']
                }
            }
        },
    ]
};