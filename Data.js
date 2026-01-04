const users=[
    { email:"leo@gmail.com", password:"123" , nom:"Leo", solde:15000,
        transactions:[
            { type:"+", description:"Salaire", amount:3000, date:"2023-01-05" },
            { type:"-", description:"Courses", amount:150, date:"2023-01-10" },
            { type:"-", description:"Loisir", amount:200, date:"2023-01-12" }
        ],
        cards: [
      {
        id: "card1",
        type: "Visa",
        number: "4111 1111 1111 1111",
        solde: 5000,
        expire: "12/26"
      },
      {
        id: "card2",
        type: "MasterCard",
        number: "5500 0000 0000 0004",
        solde: 8000,
        expire: "11/27"
      }
    ]
     },
    { email:"lea@example.com", password:"321",nom:"Lea", solde:36000,
        cards: [],
        transactions:[
            { type:"+", description:"Salaire", amount:20000, date:"2023-02-03" },//status success||failed
            { type:"-", description:"Voyage", amount:800, date:"2023-02-15" },
            { type:"-", description:"Restaurant", amount:120, date:"2023-02-20" }
        ]
     },
     { email:"lilly@gmail.com", password:"abc", nom:"lilly",solde:16000,
        cards: [],
        transactions:[
            { type:"-",description:"Cinéma", amount:150, date:"2023-03-10" },
            { type:"-",description:"Cadea", amount:500, date:"2023-03-15" },
            { type:"-",description:"Ikea", amount:5000, date:"2023-03-18" }
        ]
     }

];

function findUser(email,password){
    let user=null;
    return user=users.find((u)=>u.email===email&&u.password===password); //u => user object
}

export {findUser};

function findCardById(user, cardId) {
  return user.cards.find(card => card.id === cardId);
}

export { findUser, findCardById };






/*
voila les balise HTML qu'on a travailler avec 

<select id="cardSelect"></select>
<input type="number" id="amount" placeholder="Montant à recharger">
<button id="recharger">Recharger</button>
*/