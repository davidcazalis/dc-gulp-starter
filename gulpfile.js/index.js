/**
 * Normalement toutes les tâches Gulp sont dans un fichier gulpfile.js
 * Ici, on utilise plutôt require-dir pour découper notre gulpfile.js
 * en plusieurs fichiers. Chaque tâche à son propre fichier situé
 * dans le repertoire gulpfile.js/tasks.
 *
 * Si vous avez besoin d'ajouter d'autres tâches, ajouter simplement
 * votre fichier dans ce répertoire.
 *
 * gulpfile.js/tasks/default.js est le fichier utilisé pour lancer la
 * tâche par défaut de Gulp.
 *
 * On utilise également un fichier config.json à la racine de ce
 * repertoire pour configurer nos différents chemins et options de tâches.
 */

var requireDir = require('require-dir');

requireDir('./tasks', { recurse: true });
