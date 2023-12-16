ajaxGET("/weddingParty", function (data) {
  //console.log("before parsing", data);
  // this call is JSON so we have to parse it:
  const parsedData = JSON.parse(data);
  for(let i = 0; i < parsedData.length; i++) {
      let p = parsedData[i];
      // let groomsmen = parsedData[i+1];
      populateWeddingParty(p["img-src"], p["title"], p["name"], p["age"], p["ig"]);
  }
})

function populateWeddingParty(image, title, name, age, ig) {
  const cardTemplate = document.getElementById("weddingCardTemplate");
  // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
  var newcard = cardTemplate.content.cloneNode(true);

  newcard.querySelector('.wp-title').innerHTML = title;
  newcard.querySelector('.wp-img').src = `/img/${image}.jpg`; //Example: NV01.jpg
  newcard.querySelector('.wp-name').innerHTML = name;
  newcard.querySelector('.wp-age').innerHTML = age;
  newcard.querySelector('.wp-ig').innerHTML = ig;

  document.getElementById("wedding-party").appendChild(newcard);
}