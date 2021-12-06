const reviewaddHandler = async (event) => {
    event.preventDefault();
  
  
    const coursename = document.querySelector('#post-course').value.trim();
    const coursepar = document.querySelector('#post-coursePar').value.trim();
    const coursereview = document.querySelector('#post-coursereview').value.trim();
    const courserating = document.querySelector('#post-courserating').value.trim();
  
    if (coursename && coursepar && coursereview && courserating) {
      const response = await fetch('/addreview', {
        method: 'POST',
        body: JSON.stringify({ coursename, coursepar, coursereview, courserating }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
          console.log(response)
        document.location.replace('/');
      } 
    } else {
        alert('Please fill out all field!');
      }
  };
  
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', reviewaddHandler);
  