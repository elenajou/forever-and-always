let familia;
let whatsapp;
let populate;
let invitadosRef;
let populateBtn;
let formInputs;

function populateData() {
  familia = document.getElementById("name").value.toLowerCase();
  contacto = parseInt(document.getElementById("whatsapp").value);
  populate = document.getElementById("populate");
  populateBtn = document.getElementById("populateBtn");
  formInputs = document.querySelector(".form-inputs");
  invitadosRef = db.collection("invitados");

  invitadosRef
    .where('contacto', '==', contacto)
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
            const thisContacto = thisDoc.contacto;
            const guestNum = thisDoc.puestosReservados;

            formInputs.innerHTML = `
              <div>Familia /Nombre Completo: <br><span>${thisFamilia}</span></div>
              <div>Numero de Contacto: <span>${thisContacto}</span</div>
              <label for="quantity">Puestos Reservados</label>
              <input type="number" id="${ID}" class="numOfGuests" name="quantity" min="1" max="${guestNum}" value="${guestNum}" required></input>
              <label for="comentario">Comentario</label>
              <input type="text" id="comentario-${ID}" class="comentario" name="comentario" maxlength="100">
              <button type="button" onclick="confirmGuest()" class="btn btn-light form-btn" name="submit">Estare ahi!</button>
              <button type="button" onclick="rejectGuest()" class="btn btn-light form-btn" id="rejectBtn">No podre asistir</button>`;
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

function sadMsg(){
  document.getElementById("msg").className = "error";
  document.getElementById("msg").innerHTML = "Es una lastima :(";
}

function removeMsg(){
  document.getElementById("msg").className = "";
  document.getElementById("msg").innerHTML = "";
}

function confirmGuest() {
  try {
    const guestNum = document.querySelector(".numOfGuests");
    const comentario = document.querySelector(".comentario");
    const ID = guestNum.id;
    const num = parseInt(guestNum.value);
    console.log("successfully got", ID);

    const docRef = db.collection('invitados').doc(ID);

    const updateField = {};
    updateField['confirmaron'] = true;
    updateField['rechazaron'] = false;
    updateField['puestosConfirmados'] = num;
    updateField['comentario'] = comentario.value;

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

function rejectGuest() {
  try {
    const guestNum = document.querySelector(".numOfGuests");
    const ID = guestNum.id;
    const num = 0;
    const comentario = document.querySelector(".comentario").value;

    const docRef = db.collection('invitados').doc(ID);
    console.log("successfully got", ID);


    const updateField = {};
    updateField['rechazaron'] = true;
    updateField['confirmaron'] = false;   
    updateField['puestosConfirmados'] = num;
    updateField['comentario'] = comentario;

    docRef.update(updateField)
      .then(() => {
        removeMsg();
        sadMsg();
      })
  } catch (error) {
    console.log(error);
    removeMsg();
    setTimeout(errorMsg, 100);
    console.log("error updating");
  }
}