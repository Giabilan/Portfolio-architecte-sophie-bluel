// Import de la liste de tous les travaux, à partir de "data.js"
import { works, categories } from "./data.js";

// Import de la fonction "generateGallery" à partir de "gallery.js"
import { generateGallery } from "./gallery.js";

// Fonction qui affiche ou masque le "mode édition" en fonction du "click"
export function displayModal() {
  const btnOpenModal = document.querySelector(".btnOpenModal");
  const btnCloseModal = document.querySelectorAll(".btnCloseModal");
  const modal = document.querySelector(".modal");

  // Bouton ouvrir la modale
  btnOpenModal.addEventListener("click", function () {
    modal.style.display = "flex";
  });

  // Bouton fermer la modale
  for (let i = 0; i < btnCloseModal.length; i++) {
    btnCloseModal[i].addEventListener("click", function () {
      modal.style.display = "none";
    });
  }

  // Ferme la modale au clique à l'extérieur de la modale
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

// Récupération de la class "btnReturnModal"
const btnReturnModal = document.querySelector(".btnReturnModal");

// Me retourne sur "modalContent" au clique sur "btnReturnModal"
btnReturnModal.addEventListener("click", function () {
  const modalContent = document.querySelector(".modalContent");
  modalContent.style.display = "flex";
  const modalForm = document.querySelector(".modalForm");
  modalForm.style.display = "none";
});

// Fonction pour générer la "gallery" de la modale
function generateGalleryModal(works) {
  // Parcours les données "works"
  for (let i = 0; i < works.length; i++) {
    // "work" contient tout les travaux de api/work
    const work = works[i];
    // Récupération de la class "modalGallery" du DOM
    const modalGallery = document.querySelector(".modalGallery");
    // Création d'une balise "figure" pour chaque travaux
    const modalGalleryFigure = document.createElement("figure");
    //   Récupération de chaque "id" des travaux
    modalGalleryFigure.dataset.id = work.id;
    // Création d'une balise "img" pour chaque travaux
    const modalGalleryImage = document.createElement("img");
    // Récupération dès URL de chaque image
    modalGalleryImage.src = work.imageUrl;
    // Récupération dès titres de chaque image
    modalGalleryImage.alt = work.title;

    // Création d'un "button" pour chaque projet qui contiendra une icone "déplacement"
    const btnIconMove = document.createElement("button");
    btnIconMove.className = "btnIconMove";
    const iconMove = document.createElement("i");
    iconMove.className = "fa-solid fa-arrows-up-down-left-right";

    // Création d'un "button" pour chaque projet qui contiendra une icone "supprimer"
    const btnIconTrash = document.createElement("button");
    btnIconTrash.className = "btnIconTrash";
    const iconTrash = document.createElement("i");
    iconTrash.className = "fa-solid fa-trash-can";

    // Supprime le projet au clique de l'icone "supprimer"
    btnIconTrash.addEventListener("click", function () {
      // Appel de la fonction "deleteWork" pour supprimer le projet
      deleteWork(work.id);
    });

    // Création d'un "button" pour chaque projet qui contiendra un texte : "éditer"
    const modaleEditBtn = document.createElement("button");
    modaleEditBtn.className = "modaleEditBtn";
    modaleEditBtn.innerText = "éditer";

    // Rattachement de chaque élement à un parents
    modalGallery.appendChild(modalGalleryFigure);
    modalGalleryFigure.appendChild(modalGalleryImage);
    modalGalleryFigure.appendChild(btnIconMove);
    btnIconMove.appendChild(iconMove);
    modalGalleryFigure.appendChild(btnIconTrash);
    btnIconTrash.appendChild(iconTrash);
    modalGalleryFigure.appendChild(modaleEditBtn);
  }
}
// Appel de la fonction
generateGalleryModal(works);

// Récupération du Token d'authentification
const authToken = sessionStorage.getItem("authToken");

// Fonction "suppresion" de projet à partir de la "modalContent"
async function deleteWork(workId) {
  // Suppression du projet en fonction de l'ID du projet
  const responseDelete = await fetch(
    "http://localhost:5678/api/works/" + workId,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }
  );

  // Si la réponse est "ok" alors le projet sera supprimer
  if (responseDelete.ok) {
    // Récupération de l'ID sélectionner (projet)
    const workToRemove = document.querySelector(
      `figure[data-id="${workId}"]`
    );

    // Retire le(s) projet(s)

      workToRemove.remove();

    // Trouver l'index du projet dans le tableau "works" dont l'ID correspond
    const workIndexToRemove = works.findIndex((work) => workId === work.id);
    // Supprime l'élément du tableau "works" à l'index "workIndexToRemove", "1" élément
    works.splice(workIndexToRemove, 1);
    // Sinon
  } else {
    return alert("Échec de la suppression du projet");
  }
}

// Récupération de la class "btnAddImg" de "modalContent"
const btnAddImg = document.querySelector(".btnAddImg");

// Masque la "modalContent" et Affiche "modalForm" au clique
btnAddImg.addEventListener("click", function () {
  const modalContent = document.querySelector(".modalContent");
  modalContent.style.display = "none";
  const modalForm = document.querySelector(".modalForm");
  modalForm.style.display = "flex";
});

// Gestion du "preview" de l'image choisie à "ajout photo" de la "madalForm"
const inputAddImage = document.querySelector("#inputAddImage");

inputAddImage.addEventListener("change", function () {
  // Si la taille du fichier est <= à 4 Mo
  if (inputAddImage.files[0].size <= 4 * 1024 * 1024) {
    // Réinitialisation de la zone "project-photo-file-add-container" du DOM
    const containerInputAddImg = document.querySelector(
      ".containerInputAddImg"
    );
    // Vide le "containerInputAddImg" pour afficher l'image sélectionner (preview)
    containerInputAddImg.innerHTML = "";
    // Création d'une balise "img"
    const modalPreviewImg = document.createElement("img");
    // Création d'un objet URL à partir de la "src" sélectionner
    modalPreviewImg.src = URL.createObjectURL(inputAddImage.files[0]);
    // "modalPreviewImg" enfant de "containerInputAddImg"
    containerInputAddImg.appendChild(modalPreviewImg);
    // Permet de choisir une nouvelle image au clique sur le "preview"
    modalPreviewImg.addEventListener("click", function () {
      inputAddImage.click();
    });
  } else {
    inputAddImage.value = "";
    return alert("La taille de l'image ne doit pas être supérieure à 4mo.");
  }
});

// Copie du tableau de "categories" en enlevant l'index 0 (catégorie "Tous")
const categoriesModale = categories.slice(0);

// Parcours tout les données de "categories"
for (let i = 0; i < categoriesModale.length; i++) {
  const categoryModale = categoriesModale[i];
  // Récupération de la class "categoryListModale"
  const categoryListModale = document.querySelector("#categoryListModale");
  // Création des balises "option"
  const listScrollCategory = document.createElement("option");
  // Récupération des "id"
  listScrollCategory.value = categoryModale.id;
  // Affichage de chaque nom de "categories"
  listScrollCategory.innerText = categoryModale.name;
  // "listScrollCategory" enfant de "categoryListModale"
  categoryListModale.appendChild(listScrollCategory);
}

// Récupération des deux "input" et du buton "Valider"
// const inputAddImage = document.querySelector("#inputAddImage");
const workTitle = document.querySelector("#workTitle");
const workCategory = document.querySelector("#categoryListModale");
const validButtonFormModale = document.querySelector(".modalValidForm");

// Si les 3 inputs ont une valeurs alors affiche le btn "validForm" en vert
function checkInputs() {
  if (inputAddImage.value && workTitle.value && workCategory.value) {
    validButtonFormModale.classList.add("valid");
  } else {
    validButtonFormModale.classList.remove("valid");
  }
}

inputAddImage.addEventListener("input", checkInputs);
workTitle.addEventListener("input", checkInputs);
workCategory.addEventListener("input", checkInputs);

// Au clique sur le bouton "Valider" du "modalForm"
validButtonFormModale.addEventListener("click", function (event) {
  event.preventDefault();
  // Si les 3 champs sont remplis
  if (
    inputAddImage.checkValidity() &&
    workTitle.checkValidity() &&
    workCategory.checkValidity() === true
  ) {
    // Appel de la fonction pour ajouter un projet
    addWork();
  } else {
    // Récupération de la class "errorAddWork"
    const errorAddWork = document.querySelector(".errorAddWork");
    errorAddWork.innerText = "Tout les champs sont requis"; // Message d'erreur
    errorAddWork.style.color = "red";
  }
});

// Préparation des données du nouveau projet et envoi sur l'API "http://localhost:5678/api/works".

// Fonction ajouter un projet
async function addWork() {
  // Création d'un nouvel objet "FormData" pour stocker les données du formulaire
  const formData = new FormData();

  // Ajoute le fichier sélectionné "inputAddImage" au "formData"
  formData.append("image", inputAddImage.files[0]);
  // Ajoute la valeur saisie "workTitle" au "formData"
  formData.append("title", workTitle.value);
  // Ajoute la valeur "workCategory" choisie au "formData"
  formData.append("category", workCategory.value);

  const addResponse = await fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + authToken,
      accept: "application/json",
    },
    body: formData,
  });

  // Si réponse "ok" alors on ajoute le projet au DOM 
  if (addResponse.ok) {
    // Ajoute mon new projet à la fin du tableau "works"
    works.push(await addResponse.json());
    btnReturnModal.click();
    // Réinitialisation du DOM 
    const modalGallery = document.querySelector(".modalGallery");
    const sectionGallery = document.querySelector(".gallery");
    modalGallery.innerHTML = "";
    sectionGallery.innerHTML = "";
    // Les galleries se mettent à jour avec les new valeurs
    generateGalleryModal(works);
    generateGallery(works);
  } else {
    return alert("Échec de la l'ajout du projet");
  }
}
