let employees = [];
let currentEditId = null;
document.addEventListener("DOMContentLoaded", function() {
  let currentpage = 1; 
  let rowsPerPage = 5; 
  

  const paginationContainer = document.getElementById("paginationcontrol");
  const paginationSelect = document.getElementById("pagination");
  const totalLabel = document.getElementById("total");

  // Fetch employee data and populate the table
  async function fetchdata() {
    try {
      let response = await fetch("http://localhost:3000/employees");
      employees = await response.json();
      console.log("Fetched data:", employees);

      // Calculate total rows and total pages
      const totalRows = employees.length;
      const totalPages = Math.ceil(totalRows / rowsPerPage);

      // Update the "of X" total label
      totalLabel.innerHTML = `of ${totalPages}`;

      // Paginate the data
      const startIndex = (currentpage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const paginatedData = employees.slice(startIndex, endIndex);

      // Generate rows for the table
      let table_body = document.querySelector(".table_body");
      let row = "";

      paginatedData.forEach((element, index) => {
        row += `<tr>
                  <td id='userId' hidden>${element.id}</td>
                  <td>#0${index + 1}</td>
                  <td><img class="profile-img" src="http://localhost:3000/employees/${element.id}/avatar"
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
                           <button  id="viewDetails" class="dropdown-item px-1" type="button"   onclick="view_button('${element.id}')"><i class="fa-regular px-2 fa-eye"></i>View Details</button>
                            <button id="edit" onclick="openEditModal('${element.id}')" class="dropdown-item px-1" type="button"><i class="fa-solid px-2 fa-pen"></i>Edit</button>
                           <li><button id="delete" class="dropdown-item px-1"  type="button"  onclick="deleteEmployee('${element.id}')"> <i class="fa-regular px-2 fa-trash-can"></i>Delete </button></li>
                         </ul>
                      </div>
                  </td>
              </tr>`;
      });

      table_body.innerHTML = row;

      // Update pagination controls
      updatePagination();
    } catch (error) {
      console.error("Error fetching data:", error);
      let table_body = document.querySelector(".table_body");
      table_body.innerHTML = `<tr><td colspan="8" class="text-center text-danger">Failed to load data</td></tr>`;
    }
  }

  // Function to update pagination controls
  function updatePagination() {
    const totalRows = employees.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    // Check if pagination container exists
    if (!paginationContainer) {
      console.error("Pagination container not found");
      return;
    }

    // Clear existing pagination
    paginationContainer.innerHTML = '';
// Create first button
const firstButton = document.createElement("button");
firstButton.classList.add("pagination-button");
firstButton.textContent = "First";
firstButton.disabled = currentpage === 1;
firstButton.addEventListener("click", () => {
  currentpage = 1;
  fetchdata();
});
paginationContainer.appendChild(firstButton);

    // Create previous button
    const prevButton = document.createElement("button");
    prevButton.classList.add("pagination-button");
    prevButton.textContent = "Previous";
    prevButton.disabled = currentpage === 1;
    prevButton.addEventListener("click", () => {
      if (currentpage > 1) {
        currentpage--;
        fetchdata();
      }
    });
    paginationContainer.appendChild(prevButton);

    // Helper function to create a page button
  function createPageButton(pageNum) {
    const pageButton = document.createElement("button");
    pageButton.classList.add("pagination-button");
    pageButton.textContent = pageNum;
    pageButton.addEventListener("click", () => {
      currentpage = pageNum;
      fetchdata();
    });
    if (pageNum === currentpage) {
      pageButton.classList.add("active");
    }
    paginationContainer.appendChild(pageButton);
  }

  // Define the range of pages to display
  const maxPagesToShow = 5;
  const halfRange = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(1, currentpage - halfRange);
  let endPage = Math.min(totalPages, currentpage + halfRange);

  if (startPage > 1) {
    createPageButton(1); // Always show the first page
    if (startPage > 2) {
      paginationContainer.appendChild(document.createElement("span")).textContent = "...";
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    createPageButton(i);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationContainer.appendChild(document.createElement("span")).textContent = "...";
    }
    createPageButton(totalPages); // Always show the last page
  }
    

    // Create next button
    const nextButton = document.createElement("button");
    nextButton.classList.add("pagination-button");
    nextButton.textContent = "Next";
    nextButton.disabled = currentpage === totalPages;
    nextButton.addEventListener("click", () => {
      if (currentpage < totalPages) {
        currentpage++;
        fetchdata();
      }
    });
    paginationContainer.appendChild(nextButton);
  }

  
   // Create last button
  //  const lastButton = document.createElement("button");
  //  lastButton.classList.add("pagination-button");
  //  lastButton.textContent = "Last";
  //  lastButton.disabled = currentpage === totalPages;
  //  lastButton.addEventListener("click", () => {
  //    currentpage = totalPages;
  //    fetchdata();
  //  });
  //  paginationContainer.appendChild(lastButton);
 

  // Event listener for changing rows per page from dropdown
  paginationSelect.addEventListener("change", function() {
    rowsPerPage = parseInt(paginationSelect.value);
    currentpage = 1; 
    fetchdata();
  });

  fetchdata(); 
});



let modal = new bootstrap.Modal(document.getElementById('modalAdd'));
// Open add employee modal
function addemployee() {
  modal.show();
}

function closeAndResetForm() {
  closeFormModal();  
  resetForm();      
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
  // const image = document.getElementById("input_img");
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
// img validation



  return isValid;
};



// Save employee data
async function saveEmployee() {
  if (!validate()) return;
  // const image = document.getElementById("input_img").value;
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



  if(edit!=1){
    fetch("http://localhost:3000/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to create employee');
        }
      })
      .then(data => {
        console.log('Success:', data);
        let formdata=   new FormData()
formdata.append("avatar", document.getElementById('input_img').files[0]);

  fetch(`http://localhost:3000/employees/${data.Id}/avatar`,{
  method: "POST",
  body: formdata,
})
      })
      .catch((error) => {
        console.error('Error saving employee:', error);
      });
  } else {
    fetch(`http://localhost:3000/employees/${editDataId }`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to update employee');
        }
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error updating employee details:', error);
      });
  }
  
}



document.getElementById("save_changes").addEventListener("click", saveEmployee);



// search

// Function to filter table rows
function filterTableRows() {
  const query = document.getElementById("search_bar").value.toLowerCase(); 
  const tableBody = document.querySelector(".table_body"); 
  const rows = tableBody.getElementsByTagName("tr"); 

  // Iterate over each row
  for (let i = 0; i < rows.length; i++) {
    const name = rows[i].children[2].textContent.toLowerCase(); 
    const phone = rows[i].children[4].textContent.toLowerCase(); 

    // Check if search query matches Name or Phone
    if (name.includes(query) || phone.includes(query)) {
      rows[i].style.display = ""; 
    } else {
      rows[i].style.display = "none"; 
    }
  }
}

// Attach search functionality to the input field
document.getElementById("search_bar").addEventListener("input", filterTableRows);


function view_button(employeeId) {
  const url = "/indexview.html?";
  const obj = {
    id: employeeId, 
  };

  const searchParams = new URLSearchParams(obj);
  const queryString = searchParams.toString();
  window.location.href = url + queryString;
}


