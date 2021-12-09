const scoreDelHandler = async (event) => {
   if (event.target.hasAttribute('data-id')) {
     const id = event.target.getAttribute('data-id');
     
     const response = await fetch(`/dashboard/${id}`, {
       method: 'DELETE',
      });
      
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete course');
      } 

    }
  }

  const delButton = document.querySelectorAll('.btn-danger')

  for (let i = 0; i < delButton.length; i++) {
     delButton[i].addEventListener('click', scoreDelHandler);
  }

  