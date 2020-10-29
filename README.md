# Banometer!

Banometeret er den frekke arvtageren til [busometeret](https://github.com/lillesand/busometer).
 
Det kan kjøre på enhver webserver, og vises på en Raspberry Pi med en tilhørende [Waveshare-skjerm](https://www.digitalimpuls.no/pc-komponenter/enkortsdata/arduino/skjerm/waveshare-7-touch-skjerm-pi-stand-800480-for-raspberry-pi-3-2-b-140893-p0000153040).

Denne versjonen kjører lokalt på Raspberry Pien.

## Installasjon/deploy

### Backend

1. Kopier over `banometer.service` (se `deploy-backend.sh`)
2. Symlink inn `banometer.service` til systemd: `ln -s /home/pi/banometer/banometer.service /etc/systemd/system/banometer.service`
3. Kjør en deploy med `deploy.sh`
4. Reload systemd: `sudo systemctl daemon-reload`
5. Legg til autostart ved boot `sudo systemctl enable banometer` 
6. Start banometeret: `sudo systemctl start banometer`

Deploys gjøres med `deploy-backend.sh`.

### Frontend

Frontenden bor i `frontend`-mappa.

1. Kopier over `banometer-frontend.service` (se `deploy-frontend.sh`)
2. Symlink inn `banometer.service` til systemd: `ln -s /home/pi/banometer/banometer-frontend.service /etc/systemd/system/banometer-frontend.service`
3. Kjør en deploy med `deploy-frontend.sh`
4. Lag secrets-fil i `/etc/systemd/user/banometer.env` (tilsvarende `secrets.env` lokalt) 
4. Reload systemd: `sudo systemctl daemon-reload`
5. Legg til autostart ved boot `sudo systemctl enable banometer-frontend` 
6. Start banometeret: `sudo systemctl start banometer-frontend`

## Oppsett av Raspberry Pi
  
Noen ting jeg har gjort som det kan være nyttig å huske til senere:

* Sett screen [screen blanking](https://www.raspberrypi.org/documentation/configuration/screensaver.md) til 15 minutter for å unngå at skjermen skrur seg av i tide og utide.
* Installer [EmojiOne som font](https://github.com/eosrei/emojione-color-font#manual-install-on-any-linux) for å slippe de kjipe svart-hvitt emojiene på Raspbian.
* Installer Firefox, for å bruke SVG-emojis med farger fra EmojiOne. Bruk Firefox ESR som ikke er helt tilfredstillende, men det funker.
* Justér på skjermrotasjonen til RasPien, som dokumentert for [Waveshare-skjermen](http://www.lcdwiki.com/How_to_modify_the_display_orientation-CTP(En). Obs: de eksempelmatrisene i bunn er bare tull, men standardoppskriften virker.
* Installer [Java](https://linuxize.com/post/install-java-on-raspberry-pi/))

## Kode og sånt!

Så mye kos og moro, så lite plan og design! 

### Frontend

#### Gammelt (og fases ut)

Frontenden bor i `src/main/resources` og er bare plain JavaScript. Start i `index.html` og se på det derfra.

Ting er stort sett strukturert rundt `Views` som oppdateres regelmessig. Se for eksempel `public/cinema/CinemaView.js`.
Et view må ha:

* En `el` (elementet der det vises).
* Et `refreshInterval` (hvor ofte det refreshes).
* `show()` og `hide()`-funksjoner til å vise og skjule elementet (brukes i forbindelse med navigasjon)

#### Nuevo

React og Hooks ftw!

### Backend

Backenden er skrevet i Kotlin med [Spring-boot](https://spring.io/projects/spring-boot). Den bygger med Gradle, 
så det er et rimelig standard oppsett som bør kjøre fint de fleste IDEer. IntelliJ funker hvertfall knall.

Applikasjonen sparkes i gang fra `Application.kt`, og den bør funke å kjøre uten noe mer kontekst enn det.
