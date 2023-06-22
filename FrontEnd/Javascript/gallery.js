// Import de la liste de tous les travaux, à partir de "data.js"
import { works, categories } from "./data.js";

// ---------------fonction qui affiche la gallery---------------

// Fonction pour générer la "gallery" avec le paramètre "works" du fichier "data.js"
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

// ---------------Filtre---------------

// Ajout de l'objet "categoryAll" au tableau "categories"
const categoryAll = { id: 0, name: "Tous" };
// J'ajoute l'objet "categoryAll" au début du tableau "categories"
categories.unshift(categoryAll);
// Parcours tout les données du tableau "categories"
for (let i = 0; i < categories.length; i++) {
  // "category" contient chaque objet du tableau "categories"
  const category = categories[i];
  // Récupération de la class "allFilterButton"
  const containerFilterBtn = document.querySelector(".containerFilterBtn");
  // Création de bouton pour chaque catégorie (4 boutons)
  const btnFiltre = document.createElement("button");
  // Ajout du texte du bouton "Tous" via la propriété de l'objet "categoryAll" (name)
  btnFiltre.innerText = category.name;
  // Ajout d'un évenement au "click" sur les boutons de "btnFiltre"
    btnFiltre.addEventListener("click", function () {
      // Appel de la fonction "categoryFilter" avec l'argument "category.id" qui est l'id de api/categories
      categoryFilter(category.id);
    });
  // "btnFiltre" enfant de "containerFilterBtn"
  containerFilterBtn.appendChild(btnFiltre);
}

// Fonction Filtrer
function categoryFilter(IdOfApiCategories) {
  // Si l'ID de api/categories == à l' ID de l'objet "categoryAll"
  if (IdOfApiCategories == categoryAll.id) {
    // Alors tu me vide la class "gallery"
    document.querySelector(".gallery").innerHTML = "";
    // Affiche tout les travaux
    generateGallery(works);
    // Sinon
  } else {
    // Filtrage de chaque objet
    const worksFiltered = works.filter(function (work) {
      // Me retourne, Si l'ID de api/works "categoryId" est == à l'ID de api/categories "id"
      return work.categoryId == IdOfApiCategories;
    });

    // Affichage de la "gallery" filtrée
    document.querySelector(".gallery").innerHTML = "";
    generateGallery(worksFiltered);
  }
}
