fetch(
  'https://randomuser.me/api/?results=12&nat=us&inc=name,location,email,phone,dob,picture'
)
  .then((response) => response.json())
  .then((data) => {
    const randomUserArray = data.results;
    console.log(randomUserArray);

    generateUserCards(randomUserArray);

    let gallery = document.querySelector('#gallery');
    let allCards = gallery.children;
    const cardsArray = Array.from(allCards);
    console.log(gallery);
    gallery.addEventListener('click', (e) => {
      console.log(e.relatedTarget);
      // console.log(cardsArray.indexOf(e.currentTarget));
    });
  });

function generateUserCards(array) {
  let galleryHTML = array
    .map(
      (results) =>
        `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${results.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 class="card-name cap">${results.name.first} ${results.name.last}</h3>
                <p class="card-text">${results.email}</p>
                <p class="card-text cap">${results.location.city}, ${results.location.state}</p>
            </div>
        </div>
        `
    )
    .join('');

  document
    .getElementById('gallery')
    .insertAdjacentHTML('beforeend', galleryHTML);
}

function generateModal() {
  let modalHTML = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                    <h3 id="name" class="modal-name cap">name</h3>
                    <p class="modal-text">email</p>
                    <p class="modal-text cap">city</p>
                    <hr>
                    <p class="modal-text">(555) 555-5555</p>
                    <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                    <p class="modal-text">Birthday: 10/21/2015</p>
                </div>
            </div>
        </div>`;

  document.getElementById('gallery').insertAdjacentHTML('afterend', modalHTML);
}
