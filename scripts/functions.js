function playMusic() {
  document.getElementById("my_audio").play();
}

document.getElementById("msg-btn").click();
console.log("clicked");

$(document).ready(function() {
  $('#cover-photo').removeClass("aos-animate");
  $('#invitacion').removeClass("aos-animate");
});

/* Redirects the page to fridge.html on closing the confirmation modal. */
$("#abrirCarta").on("hidden.bs.modal", function () {
  console.log("hid the message");
  $('#cover-photo').addClass("aos-animate");
  $('#invitacion').addClass("aos-animate");
  // $('#invitacion').addClass = 'aos-animate';
});
