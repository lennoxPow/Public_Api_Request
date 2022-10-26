const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("search-input");
// state of the application (the data needed for the application to work.)
let userState;

// This  is used to send request to the api to get 12 users
const randomUserApiUrl = "https://random-data-api.com/api/v2/users?size=12";
fetch(randomUserApiUrl, {
  method: "GET",
  headers: {
    Accept: "application/json, text/plain",
    "Content-type": "application/json",
  },
})
  .then((res) => res.json())
  .then((data) => {
    // Call the printUserOnDom function to print the recieved user data on html document
    // set the userState to returned users.
    userState = data;
    printUserOnDom(data);
  })
  .catch((err) => console.log(err));

// Change event listener on search form. To search in the list of available users.
searchInput.addEventListener("input", (e) => {
  // Call the findUser with the search field value every time input changes.
  // search results are fed into print method to print the found users.
  printUserOnDom(findUser(e.target.value));
});

// This function is responsible for print a list of user data on the HTML DOM.
function printUserOnDom(users) {
  // delete the existing users in the gallery
  gallery.innerHTML = "";
  //   Loop through the all given users to create a list of them. and put them on dom
  for (let user of users) {
    // Temaplate for a single user filled with the user data
    const userHtml = `<div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${user.avatar}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.first_name} ${user.last_name}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.address.city}, ${user.address.state}</p>
            </div>
        </div>`;
    gallery.insertAdjacentHTML("beforeend", userHtml);
  }
  // After the creation of user cards event listeners are attached to them
  attachEventListenersOnCards();
}

// This function is responsible for attaching event listeners on user cards
function attachEventListenersOnCards() {
  const userCards = document.getElementsByClassName("card");
  for (let userCard of userCards) {
    userCard.addEventListener("click", openUserDetailsModal);
  }
}

// This function is responsibel for get the right user name when a card is clicked for the modal to popup.
function getUserDetails(event) {
  let nameTag;

  //   click can happen on any element of the card.
  // This is inplace to see wether clicked happened on which child element level.
  // This checking is necessary inorder to get the paragraph that contains name.
  const innerTags = ["P", "H3", "IMG"];
  if (innerTags.includes(event.target.tagName)) {
    nameTag = event.target.parentElement.parentElement.querySelector("#name");
  } else if (!event.target.classList.contains("card")) {
    nameTag = event.target.parentElement.querySelector("#name");
  } else {
    nameTag = event.target.querySelector("#name");
  }
  // Name is then used to find the correct user data from the list of the available users.
  return findUser(nameTag.textContent);
}

// Find the user from the user list with the given user name (first name + last name)
function findUser(userName) {
  // Higher order array method to filter the names that do not mathc with the given input.
  return userState.filter((user) => {
    const name = `${user.first_name} ${user.last_name}`;
    return name.toLowerCase().startsWith(userName.toLowerCase());
  });
}

// Will invoke the founduser function to get the selected user and invoke the printUserModalONDom to print the founduser data on the model.
function openUserDetailsModal(event) {
  const foundUser = getUserDetails(event);
  printUserModalONDom(foundUser[0]);
}

function printUserModalONDom(user) {
  const body = document.querySelector("body");
  //   Modal template filled with provided user data
  const modal = `
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${user.avatar}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${user.first_name} ${
    user.last_name
  }</h3>
            <p class="modal-text">${user.email}</p>
            <p class="modal-text cap">${user.address.city}</p>
            <hr>
            <p class="modal-text">${getPhoneNumber(user.phone_number)}</p>
            <p class="modal-text">${user.address.street_address}., ${
    user.address.state
  }, ${user.address.zip_code}</p>
            <p class="modal-text">Birthday: ${user.date_of_birth.replaceAll(
              "-",
              "/"
            )}</p>
        </div>
    </div>

    // IMPORTANT: Below is only for exceeds tasks 
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
</div>`;
  //  printed at the top of the body
  body.insertAdjacentHTML("afterbegin", modal);

  //   Call the function to attach event listeners to the elements of user modal once modal is printed on the dom
  attachEventListenersOnModalBtns(user.id);
}

//  This function is responsible for attaching event listeners to the elements of user modal.
function attachEventListenersOnModalBtns(userId) {
  // modal close button
  const modalCloseBtn = document.getElementById("modal-close-btn");
  modalCloseBtn.addEventListener("click", closeUserModal);

  //   modal next button
  const modalNextBtn = document.getElementById("modal-next");
  modalNextBtn.addEventListener("click", () => showNextModal(userId));
  //   modal prev button

  const modalPrevBtn = document.getElementById("modal-prev");
  modalPrevBtn.addEventListener("click", () => showPrevModal(userId));
}

//  This function is responsible for closing the existing user modal.
function closeUserModal() {
  document.querySelector(".modal-container").remove();
}

//  This function is responsible for showing the next modal.
function showNextModal(userId) {
  let nextModalUser;
  //   Loop through the array of avaiable users on dom.
  for (let i = 0; i < userState.length; i++) {
    // get the user who comes after the current user
    if (userState[i].id === userId) {
      nextModalUser = userState[i + 1];
    }
  }
  // if there is atleast one more next user (eg: it is not the last user)
  if (nextModalUser) {
    // Close existing user modal
    closeUserModal();
    // Show the new modal on document
    printUserModalONDom(nextModalUser);
  }
}

//  This function is responsible for showing the previous modal.
function showPrevModal(userId) {
  let prevModalUser;
  //   Loop through the array of avaiable users on dom.
  for (let i = 0; i < userState.length; i++) {
    // get the user who comes before the current user
    if (userState[i].id === userId) {
      prevModalUser = userState[i - 1];
    }
  }
  // if there is atleast one more previous user (eg: it is not the first user)
  if (prevModalUser) {
    // Close existing user modal
    closeUserModal();
    // Show the new modal on document
    printUserModalONDom(prevModalUser);
  }
}
//  This function will normalize the phone number for the given requirements.
//  (Because the phone number from the api data doesn't meet the requirements)
// phone number from api data can be in many forms.

function getPhoneNumber(phone_number) {
  // IMPORTANT: API can provide phone number in any format. It is extremely complex to deal all of the format.
  // This method may look complex.
  {
    // Get the starting for slicing the number to get rid of extra associated codes and numbers
    let phone_number_startIndex = phone_number.indexOf(" ");
    // last index for slicing is 14 unless 14 is a number.
    let phone_number_endIndex = 14;
    if (!isNaN(phone_number[phone_number_startIndex + 14]))
      phone_number_endIndex = 15;
    // Slice the phone number with just the digits needed.
    phone_number = phone_number.slice(
      phone_number_startIndex,
      phone_number_startIndex + phone_number_endIndex
    );

    // replace all "." that may exisit as seperators in phone number.
    phone_number = phone_number.replaceAll(".", "-");
    // replace any present parenthesis.
    // parenthesis would be added manually.
    phone_number = phone_number.replaceAll("(", "");
    phone_number = phone_number.replaceAll(")", "");

    // slice the phone number again if it's 3rd character is a dash - or a space " ".
    // This makes sures if there is an extra digit at the beginning eg(+1) or something.
    if (phone_number[2] === "-" || phone_number[2] === " ") {
      phone_number = phone_number.slice(3, phone_number.length);
    }
    // Trim the phone number to remove edge spacing. (extra spaces at edges)
    phone_number = phone_number.trim();

    // remove any dash "-" that comes after the first 3 degits.
    if (phone_number.indexOf("-") < 8)
      phone_number = phone_number.replace("-", " ");

    // attach the parenthesis "()" to the phone number.
    phone_number = `(${phone_number.replace(" ", ") ")}`;

    // add the last dash "-" that comes before the last 4 digits. if it's not present on the phone number.
    if (phone_number.search("-") === -1) {
      phone_number =
        phone_number.substring(0, 9) + "-" + phone_number.substring(9 + 1);
    }
    return phone_number;
  }
}
