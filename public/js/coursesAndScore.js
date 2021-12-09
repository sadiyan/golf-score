const newFormHandler = async (event) => {
    event.preventDefault();
    
    const course = document.querySelector('#course').value.trim();
    const score = document.querySelector('#score').value.trim();
    const par = document.querySelector('#par').value.trim();
    const date = document.querySelector('#date').value.trim();
    
    
    if (course && score && par && date) {
      const response = await fetch('/dashboard', {
        method: 'POST',
        body: JSON.stringify({ course, score, par, date }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create course');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/dashboard`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete course');
      }
    }
  };

  document
    .querySelector('.course-create')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.course-del')
    .addEventListener('click', delButtonHandler);
  