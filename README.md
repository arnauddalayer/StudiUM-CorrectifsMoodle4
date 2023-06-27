# StudiUM : Correctifs pour la version Moodle 4

## Description
Ce dépôt vise à offrir des scripts ou méthodes à intégrer à StudiUM (avec Moodle v.4 déployé le 27 juin 2023) permettant de corriger certains irritants de la nouvelle interface.

**Mise en garde : le contenu de ce dépôt n'est publié qu’à des fins strictement éducatives. **

## Script pour exploiter toute la largeur de l'écran & afficher le menu de gauche au complet
La nouvelle version de StudiUM basée sur Moodle 4 apporte un changement au niveau de la largeur disponible pour le contenu en raison de la présence de grandes marges.
De plus, il a été constaté que le menu de StudiUM omet, en mode consultation, d'afficher les éléments de type `Zone texte et média` (anciennement `Étiquette`).
Le script proposé vise à éliminer ces des problématiques. Le script a été testé avec succès sur Firefox (Windows) et Chrome (Windows et Android).

### Utilisation
Intégrez le code HTML et JavaScript dans une ressource de cours StudiUM. Pour ce faire, il est recommandé de l'intégrer :
* Dans une ressource de type `Zone texte et média`, dans la section `Introduction` du cours.
* Après un texte visible (pour éviter l'affichage du code JavaScript dans le menu de gauche).


Pour être en mesure d'intégrer du code JavaScript dans une ressource de cours, vous devez utiliser l'éditeur Atto, l'éditeur par défaut TinyMCE élimine automatiquement les scripts.
Pour modifier votre éditeur :
* Cliquez sur votre portrait en haut à gauche et sélectionnez `Préférences`.
* Cliquez sur `Préférences de l'éditeur`.
* Sélectionnez `Éditeur HTML Atto`.
* Cliquez sur `Enregistrer`.


### JavaScript
```js
<h1>Bonjour et bienvenue dans le site du cours STU1001 de l’été 2023</h1>
<script type="text/javascript">
	// <![CDATA[
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
// ]]>
</script>
```

### Limitations
Ce script semble ne pas poser de problème avec le `Mode d'édition`.
Par contre, ces correctifs ne s'appliqueront pas si la section `Introduction` n'est pas visible, comme il est recommandé de l'intégrer.

### Méthode alternative (Tampermonkey)
Il est également possible d'intégrer les correctifs à l'aide de [`Tampermonkey`](https://www.tampermonkey.net/).
Les avantages sont qu'il est possible de profiter des correctifs même si l'enseignant-e ne l'intègre pas dans son site de cours, et que ces correctifs s'appliqueront aussi sur les activités qui n'intègrent pas la section `Introduction` (comme les `Test`).
Le désavantage, c'est que c'est une solution qui s'applique que localement sur un poste/navigateur/utilisateur à la fois.
À priori, il ne semble pas avoir de problème si la version Tampermonkey si le correctif est déjà appliqué via StudiUM.
Pour utiliser cette version :
* Installez [`Tampermonkey`](https://www.tampermonkey.net/) dans votre navigateur.
* Rendez-vous à l'adresse du [script](src/tampermonkey/StudiUM-CorrectifsMoodle4.js) et faites l'installation.


## Recommandation pour l'affichage d'images (ex. dans un test)
Par défaut, le correctif ci-dessus pour exploiter toute la largeur de l'écran ne fonctionnera pas dans une activité de type `Test` (voir limitations de la section précédentes).
Il est bien évidemment possible d'intégrer le script sur chacune des pages du test (ce qui peut devenir rapidement laborieux), mais nous offrons ici une technique permettant de rendre l'image cliquable, pour l’afficher en plein écran dans un nouvel onglet.

Pour ce faire :
* Intégrez l'image dans la question de votre test.
* Passez en mode `HTML` de l'éditeur Atto (via l'option `Afficher plus de boutons de la barre d'outils de l'éditeur`), ou via le menu `Outils→ Code source` de TinyMCE.
* Repérez le code HTML associé à votre image, qui devrait être sous la forme 
  ```html
  <p><img src="https://studium.umontreal.ca/draftfile.php/XXXXX/user/draft/XXXXX/image.png" alt="" width="XXX" height="XXX"></p>
  ```
* Prenez en note l'adresse de l'image, qui se trouve dans l'attribut `src`.
* Remplacez ce code par le suivant :
  ```html
  <p>Soit l’image suivante (cliquez dessus pour afficher dans un nouvel onglet)&nbsp;:</p>
  <p>
    <a href="URLIMAGE" target="_blank" rel="noopener">
      <img style="width: 100%;" src="URLIMAGE" alt="">
    </a>
  </p>
  ```
  où `URLIMAGE` est l'adresse notée à l'étape précédente.

### Limitations
Nous n'avons pas fait le test, mais il est possible que cette méthode ne fonctionne pas avec un test protégé par [`Safe Exam Browser`](https://safeexambrowser.org/).