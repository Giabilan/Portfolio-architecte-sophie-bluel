// Import de la liste de tous les travaux, à partir de "data.js"
import { works } from "./data.js";

// Fonction pour générer la "galerry" avec le parmaètre "works" du fichier "data.js"
function generateGallery(works) {
  // Parcours les données "works"
  for (let i = 0; i < works.length; i++) {
    // "work" contient tout les travaux de api/work
    const work = works[i];
    // Récupération de la class "gallery" du DOM
    const gallery = document.querySelector(".gallery");
    // Création d'une balise "figure" pour chaque travaux
    const figure = document.createElement("figure");
    //   Récupération de chaque "id" des travaux
    figure.dataset.id = work.id;
    // Création d'une balise "img" pour chaque travaux
    const image = document.createElement("img");
    // Récupération dès URL de chaque image
    image.src = work.imageUrl;
    // Récupération dès titres de chaque image
    image.alt = work.title;
    // Création d'une balise "figcaption" pour chaque travaux
    const figcaption = document.createElement("figcaption");
    // Ajout dès titres de chaque image dans la balise "figcaption"
    figcaption.innerText = work.title;
    // "figure" enfant de "gallery"
    gallery.appendChild(figure);
    // "image" enfant de "figure"
    figure.appendChild(image);
    // "figcaption" enfant de "figure"
    figure.appendChild(figcaption);
  }
}
// Appel de la fonction "generateGallery" avec l'argument "works" du fichier "data.js"
generateGallery(works);
