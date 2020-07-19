const NydalenTBuss = 'NSR:StopPlace:59605';
const NydalenT = 'NSR:StopPlace:6073';
const NydalenStasjon = 'NSR:StopPlace:59649';
const GodalsVei = 'NSR:StopPlace:6193';

export const realtimeConfig = {
  screens: [
    {
      name: 'Byen',
      path: '/sentrum',
      symbol: '🏢',
      stopPlaces: [ NydalenT ],
      quays: [
        {
          id: 'NSR:Quay:11151',
          minTime: 1,
          maxDepartures: 4,
          name: '👈 Vest',
          lines: ['RUT:Line:4', 'RUT:Line:5']
        },
        {
          id: 'NSR:Quay:11153',
          minTime: 1,
          maxDepartures: 4,
          name: 'Øst 👉',
          lines: ['RUT:Line:5']
        },
      ]
    },
    {
      name: 'RiksTV',
      path: '/rikstv',
      symbol: '📺',
      stopPlaces: [ NydalenT ],
      quays: [
        {
          id: 'NSR:Quay:11153',
          minTime: 1,
          maxDepartures: 4,
          name: 'Vestli 🚀',
          lines: ['RUT:Line:4']
        }
      ]
    },
    {
      name: 'Marka',
      path: '/marka',
      symbol: '🌲',
      stopPlaces: [ GodalsVei, NydalenStasjon, NydalenTBuss ],
      quays: [
        {
          id: 'NSR:Quay:11367',
          minTime: 2,
          maxDepartures: 4,
          name: 'Godals vei til Lillomarka',
          lines: ['RUT:Line:54', 'RUT:Line:51']
        },
        {
          id: 'NSR:Quay:494',
          minTime: 5,
          maxDepartures: 4,
          name: 'Gjøvikbanen',
          lines: ['GJB:Line:R30'],
          destination: ['Gjøvik']
        },
        {
          id: 'NSR:Quay:11162',
          minTime: 3,
          maxDepartures: 2,
          name: 'Nydalen-T ved BI',
          lines: ['RUT:Line:56']
        }
      ]
    }
  ]
};
