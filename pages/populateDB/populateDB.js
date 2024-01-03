function writeDocuments() {
  invitadosRef = db.collection("invitados");

  const data = {
    familia: '管国彬先生夫人',
    contacto: 69338328,
    puestosReservados: 2,
    puestosConfirmados: 0,
    confirmaron: false,
    rechazaron: false,
  };

  invitadosRef
    .where('contacto', '==', data.contacto)
    .limit(1)
    .get()
    .then(snapshot => {
      try {
        if (!snapshot.empty) {
          snapshot.forEach(docRef => {
            console.log("contact already exists:", docRef.data().familia);
          });
        } else {
          invitadosRef
            .add(data)
            .then(docRef => {console.log("successfully added guest: ", data.familia);})
            .catch(err => {console.log(err);});
        }
      } catch {
        console.log("error adding guests");
      }
    })
}

// writeDocuments();