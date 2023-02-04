fetch(
  'https://randomuser.me/api/?results=3&nat=us&inc=name,location,email,phone,dob,picture'
)
  .then((response) => response.json())
  .then((data) => {
    const randomUserArray = data.results;
    console.log(randomUserArray);

    generateUserCards(randomUserArray);
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
                <h3 id="name" class="card-name cap">${results.name.first} ${results.name.last}</h3>
                <p class="card-text">${results.email}</p>
                <p class="card-text cap">${results.location.city}, ${results.location.state}</p>
            </div>
        </div>
        `
    )
    .join('');

  document.getElementById('gallery').innerHTML = galleryHTML;
}
