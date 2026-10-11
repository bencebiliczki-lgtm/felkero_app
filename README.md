# Firma-felkérés

Egyszerű React + Vite oldal: György Martin neve és vulgója, a keresztapai felkérés és három gomb (Igen, Nem, Végleges nem).

A Végleges nem gomb inaktív. Az Igen és Nem az oldalon jelenít meg visszajelzést. Nincs szerveroldali mentés vagy értesítés; az oldal újratöltése törli a választ.

## Indítás

```sh
npm install
npm run dev
```

PowerShellben szükség esetén `npm.cmd` használható az `npm` helyett.

## Build

```sh
npm run build
npm run preview
```

A tartalom a `src/App.jsx`, a stílus a `src/index.css` fájlban szerkeszthető.

Az Igen gomb konfettit indít. Az első három Nem kattintás véletlenszerű képet jelenít meg felugró ablakban, „De kérlek!” felirattal. A negyedik kattintás automatikusan elindítja az `Ontesznóta_javitott.mp3` fájlt, közvetlenül a kattintási eseményből. Nincs lejátszás-, szünet- vagy leállításgomb; az ablak bezárása sem állítja le a zenét. A nóta a végéig szól. Újabb Nem kattintás a befejezett nótát újraindítja, a folyamatban lévő lejátszást nem szakítja meg. A próbálkozások száma újratöltéskor nullázódik.

Az Igen gomb egy „VIVÁT György Martin Vivát család!” feliratú modalt is megnyit, konfettivel.

A felugró ablakok Escape-pel, a felirat alatti Bezárás gombbal vagy a háttérre kattintva bezárhatók.

A reakciófotókat a `src/assets/reactions` mappába kell másolni JPG, PNG vagy WebP formátumban. A fájlnevek szabadon választhatók; a Vite automatikusan bevonja őket a buildbe. Képek nélkül a felugró ablak csak a feliratot jeleníti meg.
