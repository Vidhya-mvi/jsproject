
// Function to show the delete confirmation modal
function deleteEmployee(employeeId) {
  console.log(employeeId);
  
  const deleteModalElement = document.getElementById('modalDelete');
  const deleteModal = new bootstrap.Modal(deleteModalElement);
  deleteModal.show();

  // // Find the confirmation button within the modal after it's shown
  const confirmDeleteBtn = document.getElementById('deleteEmployee');

  if (confirmDeleteBtn) {
    confirmDeleteBtn.onclick = async function() {
      try {
        // Send DELETE request to the backend API
        const response = await fetch(`http://localhost:3000/employees/${employeeId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',  
          },
        });

        //  remove the row and close the modal
        if (response.ok) {
          const row = document.querySelector(`[data-id="${employeeId}"]`);
          row.remove();
          deleteModal.hide(); 
        } else {
          alert('Failed to delete the employee');
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    };
  } else {
    console.error('Confirmation button not found!');
  }
}

// Select all delete buttons
document.querySelectorAll('.delete').forEach(button => {
  button.addEventListener('click', function() {
    // Find the closest <tr> ancestor to get the row element
    const row = this.closest('tr');

    // Get the employee ID from the data-id attribute of the <tr>
    const employeeId = row.getAttribute('data-id');

    // Call the function to show the modal and pass the employee ID
    deleteEmployee(employeeId);
  });
});




