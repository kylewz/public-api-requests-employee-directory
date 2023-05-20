let gallery = document.getElementById('gallery');

fetch(
  'https://randomuser.me/api/?results=12&nat=us&inc=name,location,email,phone,dob,picture'
)
  .then((response) => response.json())
  .then((data) => {
    const randomUserArray = data.results;
    console.log(randomUserArray);
    randomUserArray.forEach((element) => {
      element.dob.date = formatDOB(element.dob.date);
      console.log(element.dob.date);
    });

    generateUserCards(randomUserArray);

    let gallery = document.querySelector('#gallery');
    let allCards = gallery.children;
    const cardsArray = Array.from(allCards);
    console.log(gallery);

    gallery.addEventListener('click', (e) => {
      console.log(e.relatedTarget);
      generateModal(randomUserArray, 0);
      console.log(cardsArray.indexOf(e.currentTarget));
    });
  });

function formatDOB(date) {
  let year = date.slice(0, 4);
  let month = date.slice(5, 7);
  let day = date.slice(8, 10);

  return `${month}/${day}/${year}`;
}

function generateUserCards(array) {
  let galleryHTML = array
    .map(
      (employee, index) =>
        `
        <div class="card" id="card-${index}">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        </div>
        `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', galleryHTML);
}

function generateModal(array, index) {
  let modalHTML = `
  <div class="modal-container">  
    <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${array[index].picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${array[index].name.first} ${array[index].name.last}</h3>
          <p class="modal-text">${array[index].email}</p>
          <p class="modal-text cap">${array[index].location.city}</p>
          <hr>
          <p class="modal-text">${array[index].phone}</p>
          <p class="modal-text">${array[index].location.street.number} ${array[index].location.street.name}, ${array[index].location.city}, ${array[index].location.state} ${array[index].location.postcode}</p>
          <p class="modal-text">Birthday: ${array[index].dob.date}</p>
      </div>
    </div>
  </div>`;

  gallery.insertAdjacentHTML('afterend', modalHTML);
}
