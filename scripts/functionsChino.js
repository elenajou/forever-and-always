document.getElementById("msg-btn").click();
console.log("clicked");
// $('#abrirCarta').modal({backdrop: 'static', keyboard: false}, 'show');

/* Redirects the page to fridge.html on closing the confirmation modal. */
$("#abrirCarta").on("hidden.bs.modal", function () {
  $('.main-container').toggleClass("hide");

  setTimeout(() => {
    $('#logo-caption').toggleClass("hide");
    $('#logo-caption').toggleClass("addFadeup");
  }, 1000);
  setTimeout(() => {
    $('#introduccion').toggleClass("hide");
    $('#introduccion').toggleClass("addFadeup");
    $('#familias').toggleClass("hide");
    $('#familias').toggleClass("addFadeup");
  }, 1500);
  setTimeout(() => {
    $('#nombres').toggleClass("hide");
    $('#nombres').toggleClass("addFadeup");
  }, 2000);
  setTimeout(() => {
    $('#invitado').toggleClass("hide");
    $('#invitado').toggleClass("addFadeup");
    $('#displayMsg').toggleClass("hide");
    $('#displayMsg').toggleClass("addFadeup");
  }, 3000);
  setTimeout(() => {
    $('#detalles').toggleClass("hide");
    $('#detalles').toggleClass("addFadeup");
  }, 4000);
  setTimeout(() => {
    $('#logo-caption').toggleClass("addFloat");
    $('#nombres').toggleClass("addFloat");
    $('#familias').toggleClass("addFloat");
    $('#displayMsg').toggleClass("addFloat");
    $('#invitado').toggleClass("addFloat");
    $('#introduccion').toggleClass("addFloat");
    $('#detalles').toggleClass("addFloat");
    $('#firma').toggleClass("addFloat");
  }, 7000);
});
