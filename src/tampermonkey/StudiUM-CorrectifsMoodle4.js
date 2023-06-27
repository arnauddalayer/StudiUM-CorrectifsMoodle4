// ==UserScript==
// @name         StudiUM - Correctifs
// @namespace    https://github.com/arnauddalayer/studium-fullscreen
// @version      2023-06-27
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


	// Fonction pour afficher tous les items du menu de gauche, incluant les éléments de type "zone de texte" (étiquettes)
	function afficherMenuComplet() {
		var liElements = document.querySelectorAll('li.courseindex-item, li.courseindex-section');
		liElements.forEach(function(li) {
			li.classList.replace('d-flex-noedit', 'd-flex');
		});
	}


	// Fonction pour ajouter des liens aux éléments de type "zone de texte" dans le menu de gauche
	function ajouterLiensEtiquettesMenu() {
		const items = document.querySelectorAll('.courseindex-item:not(:has(a))');

		items.forEach(item => {
			const parentDiv = item.closest('.courseindex-section');
			const parentLink = parentDiv.querySelector('a.courseindex-link');
			const parentLinkHref = parentLink.getAttribute('href');
			const itemId = item.getAttribute('data-id');
			const newHref = `${parentLinkHref}#module-${itemId}`;

			const newLink = document.createElement('a');
			newLink.setAttribute('href', newHref);
			newLink.className = 'courseindex-link text-truncate';
			newLink.setAttribute('data-action', 'togglecourseindexsection');
			newLink.setAttribute('data-for', 'section_title');
			newLink.setAttribute('tabindex', '-1');

			const itemName = item.querySelector('.courseindex-name').textContent;
			newLink.textContent = itemName;

			const completionInfo = item.querySelector('.completioninfo');
			completionInfo.parentNode.insertBefore(newLink, completionInfo.nextSibling);
			item.removeChild(item.querySelector('.courseindex-name'));
        });
	}


	// Attendez que la page soit entièrement chargée
	window.addEventListener('load', function() {
		utiliserTouteLargeur();
		afficherMenuComplet();
		ajouterLiensEtiquettesMenu();
	});
})();