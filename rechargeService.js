

import { findCardById } from "../Model/Data.js";

/*
  Vérifie que le montant est valide (>0)
 */
function checkAmount(amount) {
    return new Promise((resolve, reject) => {
        if (amount > 0) resolve(amount);
        else reject("Montant invalide !");
    });
}

/*
  ----Verifie que la carte existe pour ce user
 */
function checkCard(user, cardId) {
    return new Promise((resolve, reject) => {
        const card = findCardById(user, cardId);
        if (card) resolve(card);
        else reject("Carte non trouvée !");
    });
}

/*
  ----Verifie que la carte a suffisamment de solde
 */
function checkCardSolde(card, amount) {
    return new Promise((resolve, reject) => {
        if (card.solde >= amount) resolve(amount);
        else reject("Solde de la carte insuffisant !");
    });
}

/*
  ----Debite la carte et credite le wallet
 */
function updateBalances(user, card, amount) {
    return new Promise((resolve) => {
        card.solde -= amount;        // Debit de la carte
        user.solde += amount;        // Credit dans e-wallet
        // sauvegarde dans sessionStorage
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        resolve(user.solde);
    });
}

/*
 Ajoute la transaction dans l'historique
 */
function addRechargeTransaction(user, amount, card) {
    return new Promise((resolve) => {
        const transaction = {
            date: new Date().toLocaleString(),
            description: `Recharge via ${card.type}`,
            type: "+",
            amount: amount,
            status: "success"
        };
        user.transactions.push(transaction);
        resolve(transaction);
    });
}

/*
  Fonction principale pour recharger un wallet
 */
async function recharger(user, cardId, amount) {
    try {
        const card = await checkCard(user, cardId);
        await checkAmount(amount);
        await checkCardSolde(card, amount);
        await updateBalances(user, card, amount);
        await addRechargeTransaction(user, amount, card);
        return "Recharge effectuée avec succès !";
    } catch (error) {
        throw error;
    }
}

export { recharger };
