// ==UserScript==
// @name        PartDB Lagerort Finder (Spezifisch)
// @namespace   Violentmonkey Scripts
// @match       http://localhost:8080/*
// @grant       none
// @version     1.3
// @author      pixelEDI
// @description Sendet den Lagerort aus Part-DB spezifisch an Node-RED
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function() {
        // SUCHT SPEZIFISCH: Finde ALLE Links und filtere den mit '/store_location/' im href
        let alleLinks = document.querySelectorAll('a');
        let lagerortLink = null;
        let lagerort = null;

        alleLinks.forEach(function(link) {
            // Prüfe, ob der Link auf eine Lagerort-Seite zeigt
            if (link.href && link.href.includes('/store_location/')) {
                lagerortLink = link;
                lagerort = link.textContent.trim();
                // Stoppe die Schleife, sobald der erste (und wahrscheinlich einzige) gefunden ist
                return;
            }
        });

        if (lagerort && lagerortLink) {
            console.log("Lagerort-Link gefunden:", lagerortLink);
            console.log("Lagerort (Textinhalt):", lagerort);

            // Optional: Prüfe zusätzlich, ob es wie eine Lagerplatz-Nummer aussieht
            // Entferne die Kommentarzeichen (//) der nächsten Zeile, wenn du nur Nummern willst
            // if (!/^\d{2}-\d{2}-\d{2}$/.test(lagerort)) { console.log("Text sieht nicht nach Lagerplatz-Nummer aus:", lagerort); return; }

            // Baue die Ziel-URL für Node-RED zusammen
            const url = 'http://localhost:1880/api/from-partdb?lagerplatz=' + encodeURIComponent(lagerort);

            // Sende die einfache GET-Anfrage
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.status);
                    }
                    return response.text();
                })
                .then(data => {
                    console.log('Lagerort erfolgreich an Node-RED gesendet.');
                })
                .catch(error => {
                    console.error('Fehler beim Senden an Node-RED:', error);
                });
        } else {
            console.log("Kein Lagerort-Link (mit '/store_location/' im href) gefunden.");
            // Debug: Zeige alle Links an, um die Struktur zu verstehen
            // console.log("Alle Links auf der Seite:", Array.from(alleLinks).map(l => ({text: l.textContent, href: l.href})));
        }
    }, 500);
})();