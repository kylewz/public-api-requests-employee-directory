/**
 * Treehouse FSJS Techdegree, Project 5
 *
 * Using the Random User Generator API (randomuser.me), generates 12 employees
 * for an online "Awesome Startup Directory".
 */

// Variables for the fetch function
let gallery = document.getElementById('gallery');

fetch(
  'https://randomuser.me/api/?results=12&nat=us&inc=name,location,email,phone,dob,picture'
)
  .then((response) => response.json())
  .then((data) => {
    const randomUserArray = data.results;
    randomUserArray.forEach((element) => {
      element.dob.date = formatDOB(element.dob.date);
    });

    // Create and display user cards
    generateUserCards(randomUserArray);

    // Create array for use in generating modals
    let userCards = gallery.children;
    const cardsArray = Array.from(userCards);

    // Generate a modal for the clicked user card
    cardsArray.map((card, index) =>
      card.addEventListener('click', (e) => {
        generateModal(randomUserArray, index);
      })
    );
  });

// Formats the retrieved API user DOB for display in modal as mm/dd/yyyy
function formatDOB(dob) {
  let year = dob.slice(0, 4);
  let month = dob.slice(5, 7);
  let day = dob.slice(8, 10);

  return `${month}/${day}/${year}`;
}

// Function to generate HTML for user cards based on Random User API data
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

// Generate modal HTML based on clicked user card, include buttons "Prev" and
// "Next" to generate adjacent card modals, close modal with "X" button
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

  // Variables used for event listeners
  let prevBtn = document.getElementById('modal-prev');
  let nextBtn = document.getElementById('modal-next');
  let modalContainer = document.querySelector('.modal-container');

  //Check boundaries, prev and next buttons unavailable if at edges
  if (index === 0) {
    prevBtn.style.display = 'none';
  }
  if (index === array.length - 1) {
    nextBtn.style.display = 'none';
  }

  /*
  //Add listener to Prev and Next buttons to display respective user modal
  prevBtn.addEventListener('click', () => {
    modalContainer.remove();
    generateModal(array, index - 1);
  });

  nextBtn.addEventListener('click', () => {
    modalContainer.remove();
    generateModal(array, index + 1);
  });

  //Close the modal with close btn
  document.getElementById('modal-close-btn').addEventListener('click', () => {
    modalContainer.remove();
  });
  */

  modalContainer.addEventListener('click', (e) => {
    console.log(e.target);
    console.log(e.currentTarget);

    modalContainer.remove();

    if (e.target.id === 'modal-next') {
      generateModal(array, index + 1);
    } else if (e.target.id === 'modal-prev') {
      generateModal(array, index - 1);
    } else if (e.target.id === 'modal-close-btn') {
    }
  });
}
