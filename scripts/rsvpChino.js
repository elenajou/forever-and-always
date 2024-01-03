let familia;
let whatsapp;
let populate;
let invitadosRef;
let populateBtn;
let formInputs;

function populateData() {
  familia = document.getElementById("name").value.toLowerCase();
  displayMsg = document.getElementById("displayMsg");
  invitadosRef = db.collection("invitados");

  invitadosRef
    .where('familia', '==', familia)
    .limit(1)
    .get()
    .then(snapshot => {
      try {
        if (!snapshot.empty) {
          removeMsg();
          snapshot.forEach(doc => {
            const thisDoc = doc.data();      
            // const ID = doc.id;
            // const thisFamilia = thisDoc.familia;
            const guestNum = thisDoc.puestosReservados;
            const message = doc.data().msg + " - " + guestNum + "人";

            // input the family description into the invite
            confirmGuest(doc.id, parseInt(thisDoc.puestosReservados), true);
            displayMsg.innerHTML = message;
            $('#abrirCarta').modal('hide');
          })
        } else {
          throw new Exception();
        }
      } catch {
        removeMsg();
        setTimeout(errorMsg, 100);
        console.log("error accessing guests");
      }
    })
}

function confirmedMsg() {
  // document.getElementById("confirmedMsg").innerHTML = "";
  document.getElementById("msg").classList.add("confirmed");
  document.getElementById("msg").innerHTML = "确认援助";
}

function errorMsg() {
  // document.getElementById("errorMsg").innerHTML = "";
  document.getElementById("msg").classList.add("error");
  document.getElementById("msg").innerHTML = "抱歉，我找不到您的邀请函";
}

function sadMsg(){
  document.getElementById("msg").className = "error";
  document.getElementById("msg").innerHTML = "这是一个耻辱 :(";
}

function removeMsg(){
  document.getElementById("msg").className = "";
  document.getElementById("msg").innerHTML = "";
}

function confirmGuest(docID, puestosConfirmados, confirmaron) {
  try {
    const ID = docID;

    const docRef = db.collection('invitados').doc(ID);

    const updateField = {};
    updateField['confirmaron'] = confirmaron;
    updateField['puestosConfirmados'] = puestosConfirmados;

    docRef.update(updateField)
      .then(() => {
        removeMsg();
        confirmedMsg();
      })
  } catch {
    removeMsg();
    setTimeout(errorMsg, 100);
    console.log("error updating");
  }
}
