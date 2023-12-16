function displayPhotos() {
    let photoCardTemplate = document.getElementById("photo-card-template");
    let photoCardGroup = document.getElementById("photos-container");

    let photoCard = photoCardTemplate.content.cloneNode(true);
    let photoID = "europa1.JPEG"
    let photoDir = "/img/" + photoID;

    photoCard.querySelector(".img-thumbnail").src = photoDir;
    photoCard.querySelector("a").id = photoID;
    photoCard.querySelector("a").setAttribute("onclick", `modalDisplay('${photoID}')`);
    
    photoCardGroup.appendChild(photoCard);
}

displayPhotos();

function modalDisplay(photoID) {
    let modal = document.getElementById("photoModalCenter");
    let photo = document.getElementById("photoModal");
    let condition = modal.getAttribute("aria-hidden");
    let title = document.getElementById("photoModalCenterTitle");

    if (condition) {
        console.log(condition);
        modal.classList.add("show");
        modal.style = "display: block;";
        photo.src = `/img/${photoID}`;
        title.innerHTML = photoID;
    }
}

function closeModal() {
    let modal = document.getElementById("photoModalCenter");
    let photo = document.getElementById("photoModal");
    let condition = modal.getAttribute("aria-hidden");
    let title = document.getElementById("photoModalCenterTitle");

    modal.classList.remove("show");
    modal.style = "display: none;";
    photo.src = "";
    title.innerHTML = "";
    // document.getElementsByClassName("close").setAttribute("");
}

{/* <a data-toggle="modal" data-target="#photoModalCenter">

<div class="modal fade" id="photoModalCenter" tabindex="-1" role="dialog" aria-labelledby="photoModalCenterTitle" style="display: none;" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">

<div class="modal fade show" id="photoModalCenter" tabindex="-1" role="dialog" aria-labelledby="photoModalCenterTitle" style="display: block;">
  <div class="modal-dialog modal-dialog-centered" role="document"> */}
