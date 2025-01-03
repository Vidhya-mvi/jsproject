async function openEditModal(employeeId) {
  try {
      // Show the modal
      modal.show();
      document.querySelector('#modalTitle').innerText = 'Edit Employee';

      // Fetch the employee details
      const response = await fetch(`http://localhost:3000/employees/${employeeId}`);
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const employee = await response.json();

      // Populate the modal fields with the employee details
      document.getElementById('input_salutation').value = employee.salutation ;
      document.getElementById('input_fname').value = employee.firstName;
      document.getElementById('input_lname').value = employee.lastName ;
      document.getElementById('input_email').value = employee.email ;
      document.getElementById('input_phone').value = employee.phone ;
      var dataofbith = changeformat(employee.dob)
      function changeformat(val) {
        let array = val.split("-");
        console.log(array);
        
        let year = array[0];
        let month = array[1];
        let day = array[2];
        var formatDate = day + "-" + month + "-" + year;
        console.log(formatDate);
      
        return formatDate;
      }
      document.getElementById('input_dob').value = dataofbith ;
      
      document.querySelector(`input[name="gender"][value="${employee.gender}"]`).checked = true;
      document.getElementById('input_qualifications').value = employee.qualifications;
      document.getElementById('input_address').value = employee.address ;
      document.getElementById('input_country').value = employee.country;
      document.getElementById('input_state').value = employee.state;
      document.getElementById('input_city').value = employee.city;
      document.getElementById('input_zip').value = employee.zip ;
      document.getElementById('input_username').value = employee.username ;
      document.getElementById('input_password').value = employee.password ;
  } catch (error) {
      console.error("Error fetching employee details:", error);
     
  }
}


