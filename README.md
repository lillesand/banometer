# Banometer!

Banometeret er den frekke arvtageren til [busometeret](https://github.com/lillesand/busometer).
 
Det kan kjøre på enhver webserver, og vises på en Raspberry Pi med en tilhørende [Waveshare-skjerm](https://www.digitalimpuls.no/pc-komponenter/enkortsdata/arduino/skjerm/waveshare-7-touch-skjerm-pi-stand-800480-for-raspberry-pi-3-2-b-140893-p0000153040).

Denne versjonen kjører lokalt på Raspberry Pien, og har en pussig innebygd oppdateringsmekanisme der den bygger lokalt på Pien. Den oppdateringsmekanismen funker i beste fall sånn passe. 

## Oppsett
  
Noen ting jeg har gjort som det kan være nyttig å huske til senere:

* Skrudd på innstillingene for [screen blanking](https://www.raspberrypi.org/documentation/configuration/screensaver.md) med xscreensaver for å unngå at skjermen skrur seg av så kjapt.
* Installert [EmojiOne som font](https://github.com/eosrei/emojione-color-font#manual-install-on-any-linux) for å slippe de kjipe svart-hvitt emojiene på Raspbian.
* Installert Firefox, for å bruke SVG-emojis med farger fra EmojiOne. Bruk Firefox ESR som ikke er helt tilfredstillende, men det funker.

## Kode og sånt!

Så mye kos og moro, så lite plan og design! 

### Frontend

Frontenden bor i `src/main/resources` og er bare plain JavaScript. Start i `index.html` og se på det derfra.

Ting er stort sett strukturert rundt `Views` som oppdateres regelmessig. Se for eksempel `public/cinema/CinemaView.js`.
Et view må ha:

* En `el` (elementet der det vises).
* Et `refreshInterval` (hvor ofte det refreshes).
* `show()` og `hide()`-funksjoner til å vise og skjule elementet (brukes i forbindelse med navigasjon)

### Backend

Backenden er skrevet i Kotlin med [Spring-boot](https://spring.io/projects/spring-boot). Den bygger med Gradle, 
så det er et rimelig standard oppsett som bør kjøre fint de fleste IDEer. IntelliJ funker hvertfall knall.

Applikasjonen sparkes i gang fra `Application.kt`, og den bør funke å kjøre uten noe mer kontekst enn det.