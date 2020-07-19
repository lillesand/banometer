const NydalenT = 'NSR:StopPlace:59605';
const NydalenStasjon = 'NSR:StopPlace:59649';
const GodalsVei = 'NSR:StopPlace:6193';

export const realtimeConfig = {
  screens: [
    {
      name: 'Til marka!',
      path: '/marka',
      symbol: '⛷',
      stopPlaces: [ GodalsVei, NydalenStasjon, NydalenT ],
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
