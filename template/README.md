# KPMG my-project - Web Inspector

<p align="center"><img src="https://developers.google.com/web/tools/lighthouse/images/lighthouse-logo.svg" /></p>

_KPMG Web Inspector_ est un produit générique qui permet de générer un rapport [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) à partir d'un [script de parcours](#script-de-parcours).

Toute sa documentation se trouve dans son dépôt [Web Inspector](https://kpmgfr.visualstudio.com/Plateforme%20Technologique/_git/web-inspector).


## Générer des rapports

1. Aller dans la Pipeline de ce projet : [Pipeline Web Inspector](https://kpmgfr.visualstudio.com/Constellation/_build?definitionId=1049)
2. Cliquer en haut à droite sur "Run Pipeline".
3. Selectionner la branche `main`.
4. Dans `Stages to run`, selectionner l'environnement à parcourir.
5. Cliquer sur `Run`.
6. Lorsque le rapport est généré, cliquer sur `X published, X consumed` dans la section `Related` du `Summary`.
7. Le Rapport est disponible en HTML et JSON dans `web-inspector`.

## Script de parcours

**Variables d'environnement**

**Obligatoirement dans un Keyvault, jamais dans le code.**
* `MY_URL` : Url absolue de l'environnement sur lequel lancer les parcours.
