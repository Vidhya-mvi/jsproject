let params = new URLSearchParams(document.location.search);
let id = params.get("id");
console.log(id);

function detailsEmployee(employeeId) {
  fetch(`http://localhost:3000/employees/${employeeId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((employee) => {
      console.log(employee);
      const dateOfBirth = employee.dob;
      const age = calculateAge(dateOfBirth);
      console.log("Age:", age);

      const employeeDetails = document.getElementById("detailsemp");

      employeeDetails.innerHTML = `
        <div style="position: relative;" class="col head pt-3">
            <img src="Background Image.png" alt="">
        </div>
        <div style="justify-content: center;" class="col profile_img d-flex">
            <img src="http://localhost:3000/employees/${employee.id}/avatar">
        </div>
        <div style="flex-direction: column;text-align: center;" class="col emp_details d-flex">
            <h5>${employee.firstName}</h5>
            <p>${employee.email}</p>
        </div>
        <div class="row details mb-4">
            <div class="col-4">
                <div class="data">
                    <p>Gender</p>
                    <h6>${employee.gender}</h6>
                </div>
            </div>
            <div class="col-4">
                <div class="data">
                    <p>Age</p>
                    <h6>${age}</h6>
                </div>
            </div>
            <div class="col-4">
                <div class="data">
                    <p>Date of Birth</p>
                    <h6>${employee.dob}</h6>
                </div>
            </div>
        </div>
        <div class="row mb-4">
            <div class="col-6">
                <div class="data">
                    <P>Mobile Number</P>
                    <h6>${employee.phone}</h6>
                </div>
            </div>
            <div class="col-6">
                <div class="data">
                    <p>Qualifications</p>
                    <h6>${employee.qualifications}</h6>
                </div>
            </div>
        </div>
        <div class="row mb-5">
            <div class="col-6">
                <div class="data">
                    <P>Address</P>
                    <h6>${employee.address}</h6>
                </div>
            </div>
            <div class="col-6">
                <div class="data pb-2">
                    <p>Username</p>
                    <h6>${employee.username}</h6>
                </div>
            </div>
        </div>
        <div class="view_button mb-4 pb-5">
            <button type="button" class="btn btn-danger" id="delete_btn">Delete</button>
            <button class="btn btn-primary" id="edit_btn">Edit Details</button>
        </div>
       `;

      // Add event listeners for delete and edit buttons
      // document.getElementById("delete_btn").addEventListener("click", () => {
      //   deleteEmployee(employee.id);
      // });

    //   document.getElementById("edit_btn").addEventListener("click", () => {
    //     openEditModal(employee);
    //   });
    });
}

detailsEmployee(id);

// Calculate age
function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const currentDate = new Date();
  const timeDiff = currentDate - dob;
  const age = Math.floor(timeDiff / (365.25 * 24 * 60 * 60 * 1000));
  return age;
}

// // Delete employee
// function deleteEmployee(employeeId) {
//   if (confirm("Are you sure you want to delete this employee?")) {
//     fetch(`http://localhost:3000/employees/${employeeId}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         if (response.ok) {
//           alert("Employee deleted successfully!");
//           window.location.href = "/employees.html"; 
//         } else {
//           alert("Error deleting employee!");
//         }
//       })
//       .catch((error) => console.error("Error:", error));
//   }
// }

