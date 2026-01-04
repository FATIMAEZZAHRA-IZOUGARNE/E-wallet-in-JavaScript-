
import { recharger } from "../Services/rechargeService.js";

// recuperer les elements
const cardSelect = document.querySelector("#cardSelect"); // <select> pour choisir la carte
const amountInput = document.querySelector("#amount");    // input pour le montant
const rechargeBtn = document.querySelector("#recharger"); // bouton recharger

// Recuperer l'utilisateur courant
const user = JSON.parse(sessionStorage.getItem("currentUser"));

// Fonction pour remplir le select avec les cartes disponibles
function populateCards() {
    if (!user.cards || user.cards.length === 0) {
        cardSelect.innerHTML = `<option value="">Aucune carte disponible</option>`;
        rechargeBtn.disabled = true; // bloque le bouton si aucune carte
        return;
    }

    cardSelect.innerHTML = ""; // ici vide avant de remplir
    user.cards.forEach(card => {
        const option = document.createElement("option");
        option.value = card.id;
        option.textContent = `${card.type} - ${card.number.slice(-4)} (solde: ${card.solde} MAD)`;
        cardSelect.appendChild(option);
    });
}

// Appel de la fonction au chargement
populateCards();

// --Fonction principale pour gerer le clic sur "Recharger"
async function handleRecharge() {
    const amount = Number(amountInput.value);
    const cardId = cardSelect.value;

    if (!cardId) {
        alert("Veuillez sélectionner une carte !");
        return;
    }

    try {
        const message = await recharger(user, cardId, amount);
        alert(message);
        // Rafraichir le dashboard pour afficher le nouveau solde
        window.location.href = "../View/dashboard.html";
    } catch (error) {
        alert(error);
    }
}


rechargeBtn.addEventListener("click", handleRecharge);
