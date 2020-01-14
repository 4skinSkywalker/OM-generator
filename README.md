```
_______/\\\\\_______/\\\\____________/\\\\_______________/\\\\\\\\\\\\______________________________
 _____/\\\///\\\____\/\\\\\\________/\\\\\\_____________/\\\//////////_______________________________
  ___/\\\/__\///\\\__\/\\\//\\\____/\\\//\\\____________/\\\__________________________________________
   __/\\\______\//\\\_\/\\\\///\\\/\\\/_\/\\\___________\/\\\____/\\\\\\\_____/\\\\\\\\___/\\/\\\\\\___
    _\/\\\_______\/\\\_\/\\\__\///\\\/___\/\\\___________\/\\\___\/////\\\___/\\\/////\\\_\/\\\////\\\__
     _\//\\\______/\\\__\/\\\____\///_____\/\\\___________\/\\\_______\/\\\__/\\\\\\\\\\\__\/\\\__\//\\\_
      __\///\\\__/\\\____\/\\\_____________\/\\\___________\/\\\_______\/\\\_\//\\///////___\/\\\___\/\\\_
       ____\///\\\\\/_____\/\\\_____________\/\\\___________\//\\\\\\\\\\\\/___\//\\\\\\\\\\_\/\\\___\/\\\_
        ______\/////_______\///______________\///_____________\////////////______\//////////__\///____\///__
```
Un generatore di OM boilerplate a partire da un documento Excel (standardizzato) di "analisi".

## Come generare OM

1. Installa Node.js
2. Clona il repositorio in locale
3. Lancia il comando `npm install`
4. Copia "template.xlsx" e inserisci i dati
5. Lancia il comando `node gen-serv -autore [autore] -descrizione [descrizione] -dominio [dominio] -servizio [servizio] -file [file]`
6. I file di OM vengono generati in "/dist/[nomeservizio]/om"

## Come generare request/response JSON

1. Compila un Excel di analisi partendo da "template.xlsx", segui l'esempio di "demo.xlsx"
2. Effettua il drag-and-drop del file al di sopra di "gen-json.bat"
3. I file di request/response vengono generati nella stessa cartella del file di analisi

## Contribuire

1. Fai il fork del repositorio
2. Clona il repositorio nel PC
3. Crea un nuovo branch
4. Cambia qualcosa
5. Fai commit
6. Fai push
7. Inoltra una Pull Request

I tuoi cambiamenti non saranno immediatamente disponibili.
