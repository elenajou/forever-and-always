let familia;
let whatsapp;
let populate;
let invitadosRef;
let populateBtn;
let formInputs;

function populateData() {
  familia = document.getElementById("name").value.toLowerCase();
  whatsapp = parseInt(document.getElementById("whatsapp").value);
  populate = document.getElementById("populate");
  populateBtn = document.getElementById("populateBtn");
  invitadosRef = db.collection("invitados");
  formInputs = document.querySelector(".form-inputs");
  console.log(typeof whatsapp, whatsapp);

  invitadosRef
    .where('whatsapp', '==', whatsapp)
    .limit(1)
    .get()
    .then(snapshot => {
      try {
        if (!snapshot.empty) {
          removeMsg();
          snapshot.forEach(doc => {
            const thisDoc = doc.data();      
            const ID = doc.id;
            const thisFamilia = thisDoc.familia;
            const thisWhatsapp = thisDoc.whatsapp;
            const guestNum = thisDoc.invitadosOriginal;
  
            if (thisFamilia.toLowerCase() != familia) {
              throw new Exception();
            }

            formInputs.innerHTML = `
              <div>Familia /Nombre: <span>${thisFamilia}</span></div>
              <div>Whatsapp: <span>${thisWhatsapp}</span</div>
              <label for="quantity">Numero de Invitados</label>
              <input type="number" id="${ID}" class="numOfGuests" name="quantity" min="1" max="10" value="${guestNum}" required></input>
              <button type="button" onclick="confirmGuest()" class="btn btn-light form-btn" name="submit">Estare ahi!</button>`;
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
  document.getElementById("msg").innerHTML = "Asistencia confirmada!";
}

function errorMsg() {
  // document.getElementById("errorMsg").innerHTML = "";
  document.getElementById("msg").classList.add("error");
  document.getElementById("msg").innerHTML = "Lo siento, no encuentro su invitacion";
}

function removeMsg(){
  document.getElementById("msg").className = "";
  document.getElementById("msg").innerHTML = "";
}

function confirmGuest() {
  try {
    const guestNum = document.querySelector(".numOfGuests");
    const ID = guestNum.id;
    const num = parseInt(guestNum.value);
    console.log("successfully got", ID);

    const docRef = db.collection('invitados').doc(ID);

    const updateField = {};
    updateField['confirmaron'] = true;   
    updateField['invitados'] = num;

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