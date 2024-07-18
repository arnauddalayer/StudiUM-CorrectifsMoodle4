// ==UserScript==
// @name         StudiUM - Correctifs
// @namespace    https://github.com/arnauddalayer/studium-fullscreen
// @version      2024-07-18
// @description  Correctifs pour StudiUM 4
// @author       Arnaud d'Alayer
// @match        https://studium.umontreal.ca/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	// Fonction pour supprimer la classe "limitedwidth" du body pour utiliser toute la largeur de l'écran
	function utiliserTouteLargeur() {
		document.body.classList.remove('limitedwidth');
	}


	// Attendez que la page soit entièrement chargée
	window.addEventListener('load', function() {
		utiliserTouteLargeur();
	});
})();