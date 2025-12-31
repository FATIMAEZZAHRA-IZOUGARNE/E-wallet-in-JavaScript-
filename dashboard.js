// Get user from storage safely
/* const currentUserString = sessionStorage.getItem("currentUser");
const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

// Safely show the welcome message
if(currentUser && currentUser.nom){
    welcome_message.textContent = "Bienvenue " + currentUser.nom;
} else {
    welcome_message.textContent = "Bienvenue invité";
    // Optional: redirect to login if no user
     window.location.href = "/src/view/index.html";
} */

const welcome_message = document.getElementById("welcome_message");
const balance=document.getElementById("balance");

const currentUser=JSON.parse(sessionStorage.getItem("currentUser"));//should not use the same variable name 
welcome_message.textContent = "Bienvenue " + currentUser.nom;
balance.textContent=currentUser.solde+" MAD";

const transactions_table=document.getElementById("transactions");

const transferbtn=document.getElementById("transferer");
const rechargebtn=document.getElementById("recharger");
const paybtn=document.getElementById("payer");




//afficher transactions
const tab=currentUser.transactions;
const affichetransactions=(tab)=>{ //fct prend un argument we gotte know which table
    transactions_table.innerHTML="";
    tab.forEach((u)=>{
    const row=document.createElement("tr");
    row.innerHTML="<td>"+u.date+"</td><td>"+u.description+"</td><td>"+u.type+"</td><td>"+u.amount+" MAD</td>";//coud use +montant or -montant selon type
    transactions_table.appendChild(row);
})
}

affichetransactions(tab);

transferbtn.addEventListener("click",handleTransfer);


const filtrer=document.getElementById("filtrer");

filtrer.addEventListener("change",handlefilter);//we do not click only we change :)
function handlefilter(){
    let t;
    //console.log(filtrer.value==="cred"); //verifier value 
    if(filtrer.value==="cred") {
        t=currentUser.transactions.filter((u)=>u.type==="+");
         affichetransactions(t);
    
        
    }else if(filtrer.value==="deb"){
        t=currentUser.transactions.filter((u)=>u.type==="-");
        affichetransactions(t);
    }
    else{
       affichetransactions(tab);
    }

    }



    //----------------------------------------------------------------------------------
   function checkUser() {
    return new Promise((resolve, reject) => {
        if (currentUser) {
            resolve(currentUser);
        } else {
            reject("Utilisateur non trouvé");
        }
    });
}

function checkSolde(montant) {
    return new Promise((resolve, reject) => {
        if (currentUser.solde >= montant) {
            resolve(montant);
        } else {
            reject("Solde insuffisant");
        }
    });
}

function addTransaction(montant) {
    return new Promise((resolve) => {
        const transaction = {
            date: new Date().toLocaleDateString(),
            description: "Paiement",
            type: "-",
            amount: montant
        };

        currentUser.transactions.push(transaction);
        resolve(transaction);
    });
}

function updateSolde(montant) {
    return new Promise((resolve) => {
        currentUser.solde -= montant;

        // update storage
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));

        resolve(currentUser.solde);
    });
}
function handleTransfer() {
    const montant = 100; 

    checkUser()
        .then(() => checkSolde(montant))
        .then(() => addTransaction(montant))
        .then(() => updateSolde(montant))
        .then((newSolde) => {
           
            balance.textContent = newSolde + " MAD";
            affichetransactions(currentUser.transactions);

            console.log("Transaction effectuée avec succès");
        })
        .catch((error) => {
            console.log(error);
            alert(error);
        });
}



       
