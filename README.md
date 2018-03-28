# Banometer!

Banometeret er den frekke arvtageren til [busometeret](https://github.com/lillesand/busometer).
 
Det kan kjøre på enhver webserver, og vises på en Raspberry Pi med en tilhørende [Waveshare-skjerm](https://www.digitalimpuls.no/pc-komponenter/enkortsdata/arduino/skjerm/waveshare-7-touch-skjerm-pi-stand-800480-for-raspberry-pi-3-2-b-140893-p0000153040).

Denne versjonen kjører lokalt på Raspberry Pien, og har en pussig innebygd oppdateringsmekanisme der den bygger lokalt på Pien…så får vi se hvor smart det er.

  
Noen ting jeg har gjort som det kan være nyttig å huske til senere:

* Skrudd på innstillingene for [screen blanking](https://www.raspberrypi.org/documentation/configuration/screensaver.md) med xscreensaver for å unngå at skjermen skrur seg av så kjapt.
* Installert [EmojiOne som font](https://github.com/eosrei/emojione-color-font#manual-install-on-any-linux) for å slippe de kjipe svart-hvitt emojiene på Raspbian.
* Installert Firefox, for å bruke SVG-emojis med farger fra EmojiOne. Bruk Firefox ESR som ikke er helt tilfredstillende, men det funker.