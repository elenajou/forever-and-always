function createTable() {
  invitadosRef = db.collection("invitados");
  const guestList = document.getElementById("guestList");
  let totalConfirmed = 0;
  let totalReserved = 0;

  invitadosRef
    .orderBy("familia")
    .get()
    .then(snapshot => {
      const table = document.createElement("table");
      table.innerHTML = `<tr><th>Familia/Nombre Completo</th><th>Contacto</th><th>Puestos Reservados</th><th>Confirmaron</th>`
              + `<th>Comentario</th></tr>`;

      try {
        snapshot.forEach(docRef => {
          const thisDoc = docRef.data();
          const familia = thisDoc.familia;
          const contacto = thisDoc.contacto;
          const confirmaron = thisDoc.confirmaron;
          const rechazaron = thisDoc.rechazaron;
          const puestosConfirmados = thisDoc.puestosConfirmados;
          const puestosReservados = thisDoc.puestosReservados;
          const comentario = thisDoc.comentario;

          const row = document.createElement("tr");
          if (confirmaron === true || rechazaron === true) {
            totalConfirmed += puestosConfirmados;
            row.innerHTML = `<td>${familia}</td><td>${contacto}</td><td>${puestosReservados}</td><td>${puestosConfirmados}</td><td>${comentario}</td>`;
          } else {
            row.innerHTML = `<td>${familia}</td><td>${contacto}</td><td>${puestosReservados}</td><td></td><td>${comentario}</td>`;
          }

          totalReserved += puestosReservados;
          table.appendChild(row);
        });

        guestList.innerHTML = `invitados confirmados: ${totalConfirmed} <br> puestos reservados: ${totalReserved}`;
        guestList.appendChild(table);
      } catch {
        console.log("error populating table");
      }
    })
}

createTable();

function createGuest(thisFamilia, thisNumero, thisPuestos) {
  const guest = {
    familia: thisFamilia,
    contacto: thisNumero,
    puestosReservados: thisPuestos,
    confirmaron: false,
    rechazaron: false,
    puestosConfirmados: 0
  }

  return guest;
}

function addGuest(){
  const thisFamilia = document.getElementById("addFamilia").value;
  const thisNumero = parseInt(document.getElementById("addNumero").value);
  const thisPuestos = parseInt(document.getElementById("addPuestos").value);
  const msg = document.getElementById("mensaje");
  const table = document.getElementById("guestList");

  //check if the guests exists first
  invitadosRef = db.collection("invitados");
  console.log(typeof thisFamilia, thisFamilia);
  console.log(typeof thisNumero, thisNumero);
  console.log(typeof thisPuestos, thisPuestos);
  invitadosRef
    .where('contacto', '==', thisNumero)
    .limit(1)
    .get()
    .then(snapshot => {
      try {
        if (!snapshot.empty) {
          msg.innerHTML = "ese numero ya existe";
        } else {
          invitadosRef.add(createGuest(thisFamilia, thisNumero, thisPuestos)).then(() => {
            table.removeChild(table.children[0]);
            createTable();
          });
        }
      } catch(error) {
        msg.innerHTML = "hubo un error agregando ese invitado";
        console.log("error accessing guests", error);
      }
    })
}

function updateGuest(){
  const thisFamilia = document.getElementById("newFamilia").value;
  const oldNumero = parseInt(document.getElementById("updateNumero").value);
  const thisNumero = parseInt(document.getElementById("newNumero").value);
  const thisPuestos = parseInt(document.getElementById("newPuestos").value);
  const msg = document.getElementById("mensaje");
  const table = document.getElementById("guestList");

  //check if the guests exists first
  invitadosRef = db.collection("invitados");
  console.log(typeof thisFamilia, thisFamilia);
  console.log(typeof thisNumero, thisNumero);
  console.log(typeof thisPuestos, thisPuestos);
  invitadosRef
    .where('contacto', '==', oldNumero)
    .limit(1)
    .get()
    .then(snapshot => {
      try {
        if (!snapshot.empty) {
          snapshot.forEach(doc => {
            const updatedGuest = createGuest(thisFamilia, thisNumero, thisPuestos);
            updatedGuest.confirmaron = doc.data().confirmaron;
            updatedGuest.rechazaron = doc.data().rechazaron;
            updatedGuest.puestosConfirmados = doc.data().puestosConfirmados;
            
            invitadosRef.doc(doc.id).update(updatedGuest).then(() => {
              table.removeChild(table.children[0]);
              createTable();
              msg.innerHTML = "invitado actualizado";
            });
          });
        } else {
            msg.innerHTML = "ese numero no existe";
        }
      } catch(error) {
        msg.innerHTML = "hubo un error actualizando ese invitado";
        console.log("error accessing guests", error);
      }
    })
}

