let employees = [];
let currentEditId = null;


// Fetch employee data and populate the table
async function fetchdata() {
  try {
    let response = await fetch("http://localhost:3000/employees");
    let data = await response.json();
    console.log("Fetched data:", data);

    let table_body = document.querySelector(".table_body");
    let row = "";

    data.forEach((element, index) => {
      row += `<tr>
                <td id='userId' hidden>${element.id}</td>
                <td>#0${index + 1}</td>
                <td>${element.salutation} ${element.firstName} ${element.lastName}</td>
                <td>${element.email}</td>
                <td>${element.phone}</td>
                <td>${element.gender}</td>
                <td>${element.dob}</td>
                <td>${element.country}</td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle bg-white" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis text-black"></i>
                        </button>
                          
                         <ul id="dotmenu" class="dropdown-menu  rounded-6">
                            <li><button id="viewDetails" class="dropdown-item px-1" type="button"><i class="fa-regular px-2 fa-eye"></i>View Details </button></li>
                            <button id="edit" onclick="openEditModal('${element.id}')" class="dropdown-item px-1" type="button"><i class="fa-solid px-2 fa-pen"></i>Edit</button>
                           <li><button id="delete" class="dropdown-item px-1"  type="button"  onclick="deleteEmployee('${element.id}')"> <i class="fa-regular px-2 fa-trash-can"></i>Delete </button></li>
                         </ul>
                    </div>
                </td>
            </tr>`;
    });

    table_body.innerHTML = row;
  } catch (error) {
    console.error("Error fetching data:", error);
    let table_body = document.querySelector(".table_body");
    table_body.innerHTML = `<tr><td colspan="8" class="text-center text-danger">Failed to load data</td></tr>`;
  }
}

fetchdata();


let modal = new bootstrap.Modal(document.getElementById('modalAdd'));
// Open add employee modal
function addemployee() {
  modal.show();
}

function closeAndResetForm() {
  closeFormModal();  // Close the modal
  resetForm();       // Reset the form
}

// Close modal function
function closeFormModal() {
  modal.hide();
}

// Reset form function
function resetForm() {
  document.getElementById('employeeForm').reset();

}

// Set error messages
const setError = (element, message) => {
  const input = element.parentElement;
  const errordisplay = input.querySelector('.error');

  errordisplay.innerText = message;
  input.classList.add('error');
  input.classList.remove('success');
};

// Set success states
const setSuccess = (element) => {
  const input = element.parentElement;
  const errordisplay = input.querySelector('.error');

  errordisplay.innerText = "";
  input.classList.add('success');
  input.classList.remove('error');
};

// Validate input fields
const validate = () => {
  const salutation = document.getElementById('input_salutation');
  console.log(salutation.value);
  const firstname = document.getElementById('input_fname');
  const lastname = document.getElementById('input_lname');
  const email = document.getElementById('input_email');
  const phone = document.getElementById('input_phone');
  const dob = document.getElementById('input_dob');
  console.log(dob.value)
  const qualifications = document.getElementById('input_qualifications');
  const address = document.getElementById('input_address');
  const country = document.getElementById('input_country');
  const state = document.getElementById('input_state');
  const city = document.getElementById('input_city');
  const zip = document.getElementById('input_zip');
  const username = document.getElementById('input_username');
  const password = document.getElementById('input_password');

  const salutationValue = salutation.value.trim();
  const firstnameValue = firstname.value.trim();
  const lastnameValue = lastname.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phone.value.trim();
  const dobValue = dob.value.trim();
  const qualificationValue = qualifications.value.trim();
  const addressValue = address.value.trim();
  const countryValue = country.value.trim();
  const stateValue = state.value.trim();
  const cityValue = city.value.trim();
  const zipValue = zip.value.trim();
  const usernamevalue = username.value.trim();
  const passwordvalue = password.value.trim();



  let isValid = true;

  // Salutation validation
  if (salutationValue === "") {
    setError(salutation, "Select the field");
    isValid = false;
  } else {
    setSuccess(salutation);
  }

  // First name validation
  const firstnameRegex = /^[A-Za-z]+$/;
  if (firstnameValue === "") {
    setError(firstname, "Enter the first name");
    isValid = false;
  } else if (!firstnameRegex.test(firstnameValue)) {
    setError(firstname, "Enter a valid name");
    isValid = false;
  } else {
    setSuccess(firstname);
  }

  // Last name validation
  if (lastnameValue === "") {
    setError(lastname, "Enter the last name");
    isValid = false;
  } else if (!firstnameRegex.test(lastnameValue)) {
    setError(lastname, "Enter a valid name");
    isValid = false;
  } else {
    setSuccess(lastname);
  }

  // Email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailValue === "") {
    setError(email, "Enter the email");
    isValid = false;
  } else if (!emailRegex.test(emailValue)) {
    setError(email, "Enter a valid email");
    isValid = false;
  } else {
    setSuccess(email);
  }

  // Phone number validation
  const phoneRegex = /^\d{10}$/;
  if (phoneValue === "") {
    setError(phone, "Enter the phone number");
    isValid = false;
  } else if (!phoneRegex.test(phoneValue)) {
    setError(phone, "Enter a valid phone number");
    isValid = false;
  } else {
    setSuccess(phone);
  }


  // Date of birth validation
  if (dobValue === "") {
    setError(dob, "Enter the date of birth");
    isValid = false;
  } else {
    setSuccess(dob);
  }


  // Qualification validation
  if (qualificationValue === "") {
    setError(qualifications, "Enter the qualification");
    isValid = false;
  } else {
    setSuccess(qualifications);
  }

  // Address validation
  if (addressValue === "") {
    setError(address, "Enter the address");
    isValid = false;
  } else {
    setSuccess(address);
  }

  // Country validation
  if (countryValue === "") {
    setError(country, "Select the field");
    isValid = false;
  } else {
    setSuccess(country);
  }

  // State validation
  if (stateValue === "") {
    setError(state, "Select the field");
    isValid = false;
  } else {
    setSuccess(state);
  }

  // City validation
  if (cityValue === "") {
    setError(city, "Enter the city name");
    isValid = false;
  } else {
    setSuccess(city);
  }

  // ZIP/Pin validation
  const zipRegex = /^\d{6}$/;
  if (zipValue === "") {
    setError(zip, "Enter the ZIP/Pin number");
    isValid = false;
  } else if (!zipRegex.test(zipValue)) {
    setError(zip, "Enter a valid ZIP/Pin number");
    isValid = false;
  } else {
    setSuccess(zip);
  }

  // username validation
  const usernameRegex = /^[a-zA-Z0-9_.]{3,20}$/;

  if (usernamevalue === "") {
    setError(username, "Enter the username");
    isValid = false;
  } else if (!usernameRegex.test(usernamevalue)) {
    setError(username, "Enter a valid username");
    isValid = false;
  } else {
    setSuccess(username);
  }

  // password validation

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

  if (passwordvalue === "") {
    setError(password, "Enter the password");
    isValid = false;
  } else if (!passwordRegex.test(passwordvalue)) {
    setError(password, "Enter a valid password");
    isValid = false;
  } else {
    setSuccess(password);
  }


  return isValid;
};



// Save employee data
async function saveEmployee() {
  if (!validate()) return;

  const salutation = document.getElementById('input_salutation').value;
  const firstName = document.getElementById('input_fname').value;
  const lastName = document.getElementById('input_lname').value;
  const email = document.getElementById('input_email').value;
  const phone = document.getElementById('input_phone').value;
  const dob = document.getElementById('input_dob').value;
  var dataofbith = changeformat(dob)
  function changeformat(val) {
    let array = val.split("-");
    let year = array[0];
    let month = array[1];
    let day = array[2];
    var formatDate = day + "-" + month + "-" + year;
    return formatDate;
  }
  
  const gender = document.querySelector('input[name="gender"]:checked')?.value || '';
  const qualifications = document.getElementById('input_qualifications').value;
  const address = document.getElementById('input_address').value;
  const country = document.getElementById('input_country').value;
  const state = document.getElementById('input_state').value;
  const city = document.getElementById('input_city').value;
  const zip = document.getElementById('input_zip').value;
  const username = document.getElementById('input_username').value;
  const password = document.getElementById('input_password').value;


  const newEmployee = {
    salutation,
    firstName,
    lastName,
    email,
    phone,
    dob: dataofbith,
    gender,
    qualifications,
    address,
    country,
    state,
    city,
    zip,
    username,
    password,
  };


  // 
  fetch("http://localhost:3000/employees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEmployee),
  })
    .then(response => response.json())
    .then(data => {
      console.log('success', data)
    let formdata=   new FormData()
    formdata.append("avatar", document.getElementById('input_img').files[0]);

      fetch(`http://localhost:3000/employees/${data.Id}/avatar`,{
      method: "POST",
      body: formdata,
    })
  })
    .catch((error) => {
      console.error('error saving employee', error);
    })
}


document.getElementById("save_changes").addEventListener("click", saveEmployee);


