// Fonction, "Mode édition"
export function displayEditMod() {
  // Récupération de l'état de connexion
  const authState = sessionStorage.getItem("authState");

  // Si connecté, alors
  if (authState === "true") {
    console.log("Vous êtes connecté"); // Message dans la console pour vérifier que vous êtes connecté
    // Affiche "editMod"
    editModeActivation("flex");
    //   Masque les filtres
    noFilter("none");
    // Ancre "login" qui passe en "none"
    document.getElementById("login").style.display = "none";
    // Sinon
  } else {
    // Masque "editMod"
    editModeActivation("none");
    console.log("Vous êtes déconnecté"); // Message dans la console pour vérifier que vous êtes dèconnecté
  }
}

// Fonction qui retire les filtres
function noFilter(state) {
  const containerFilterBtn = document.querySelector(".containerFilterBtn");
  containerFilterBtn.style.display = state;
}

// Fonction, activation du mode édition "editMod"
function editModeActivation(state) {
  // Récupération de tout les class "edit-mode"
  const editMod = document.querySelectorAll(".editMod");
  // Parcours tout les class "editMod"
  for (let i = 0; i < editMod.length; i++) {
    //   Pour chaque "editMod"
    editMod[i].style.display = state;
  }
}

//Récupération de l'ancre "logout"
const logoutButton = document.querySelector("#logout");
// Au click du bouton "Logout"
logoutButton.addEventListener("click", function () {
  // Récupération du token
  const authToken = sessionStorage.getItem("authToken");
  // Récupération de l'état de connexion
  const authState = sessionStorage.getItem("authState");
  // Retire le token
  sessionStorage.removeItem("authToken");
  // Retire l'état de connexion
  sessionStorage.removeItem("authState");
  // Masque "editMod"
  editModeActivation("none");
  // Ancre "login" qui passe en "flex"
  document.getElementById("login").style.display = "flex";
});
 