let gallery = document.getElementById('gallery');

fetch(
  'https://randomuser.me/api/?results=12&nat=us&inc=name,location,email,phone,dob,picture'
)
  .then((response) => response.json())
  .then((data) => {
    const randomUserArray = data.results;
    // console.log(randomUserArray);
    randomUserArray.forEach((element) => {
      element.dob.date = formatDOB(element.dob.date);
    });

    generateUserCards(randomUserArray);

    // create array for use in generating modals per card clicked
    let userCards = gallery.children;
    const cardsArray = Array.from(userCards);

    // Generate a modal for the clicked user card
    cardsArray.map((card, index) =>
      card.addEventListener('click', (e) => {
        generateModal(randomUserArray, index);
      })
    );
  });

function formatDOB(dob) {
  let year = dob.slice(0, 4);
  let month = dob.slice(5, 7);
  let day = dob.slice(8, 10);

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
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
  </div>`;

  gallery.insertAdjacentHTML('afterend', modalHTML);

  //Check boundaries, prev and next buttons unavailable if at edges
  if (index === 0) {
    document.getElementById('modal-prev').style.display = 'none';
  }
  if (index === array.length - 1) {
    document.getElementById('modal-next').style.display = 'none';
  }

  //Add listener to Prev and Next buttons to display respective user modal
  document.getElementById('modal-prev').addEventListener('click', () => {
    document.querySelector('.modal-container').remove();
    generateModal(array, index - 1);
  });

  document.getElementById('modal-next').addEventListener('click', () => {
    document.querySelector('.modal-container').remove();
    generateModal(array, index + 1);
  });

  //Close the modal with close btn
  document.getElementById('modal-close-btn').addEventListener('click', () => {
    document.querySelector('.modal-container').classList.toggle('show-modal');
  });

  setTimeout(() => {
    document.querySelector('.modal-container').classList.toggle('show-modal');
  }, 0);
}
