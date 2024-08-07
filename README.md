# StudiUM : Correctifs pour la version Moodle 4

## Description
Ce dépôt vise à offrir des scripts ou méthodes à intégrer à StudiUM permettant de corriger certains irritants de la nouvelle interface.

**Mise en garde : le contenu de ce dépôt n'est publié qu’à des fins strictement éducatives. **

## Script pour exploiter toute la largeur de l'écran
La nouvelle version de StudiUM basée sur Moodle 4 (déployée le 27 juin 2023) a apporté un changement au niveau de la largeur disponible pour le contenu en raison de la présence de grandes marges.
Cette problématique est demeurée avec la version de StudiUM basée sur Moodle 4.3 (déployée le 27 juin 2024).
Le script proposé vise à éliminer ces marges. Le script a été testé avec succès sur Firefox (Windows) et Chrome (Windows et Android).

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
<h1>Bonjour et bienvenue dans le site du cours STU1001 de l’été 2024</h1>
<script type="text/javascript">
    window.addEventListener("load", pageFullyLoaded, false);

    function pageFullyLoaded(e) {
        utiliserTouteLargeur();
    }
    
    
    // Fonction pour supprimer la classe "limitedwidth" du body pour utiliser toute la largeur de l'écran
    function utiliserTouteLargeur() {
        document.body.classList.remove('limitedwidth');
    }
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
* Rendez-vous à l'adresse du [script](src/tampermonkey/StudiUM-CorrectifsMoodle4.js).
* Cliquez sur le bouton `Raw`.
* Copiez l'intégralité du code du script.
* Cliquez sur l'icone de `Tampermonkey` dans la barre des extensions, et cliquez sur `Ajouter un nouveau script...`.
* Collez le code du script et sauvegardez.


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