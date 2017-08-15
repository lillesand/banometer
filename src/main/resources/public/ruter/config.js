window.modules.ruter.config = {
    stops: [
        { name: 'Nydalen T',
            symbol: '🚇',
            id: '3012130',
            directions: {
                '1': {
                    minTime: 4,
                    maxDepartures: 4,
                    name: '👈 Vest',
                    lines: ['4', '5']
                },
                '2': {
                    minTime: 4,
                    maxDepartures: 4,
                    name: 'Øst 👉',
                    lines: ['5']
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

        { name: 'Gullhaugveien',
            symbol: '🚌',
            id: '3012134',
            directions: {
                '1': {
                    minTime: 4,
                    maxDepartures: 4,
                    name: 'Grefsenkollen 🌲',
                    lines: ['56B', '56']
                },
                '2': {
                    minTime: 4,
                    maxDepartures: 4,
                    name: 'Sentrum 🏙',
                    lines: ['30']
                }
            }
        },
    ]
};