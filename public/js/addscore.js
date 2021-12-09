const scoreAddHandler = async (event) => {
   event.preventDefault();

   const coursename = document.querySelector('#course').value.trim();
   const coursepar = document.querySelector('#par').value.trim();
   const coursescore = document.querySelector('#score').value.trim();
   const coursedate = document.querySelector('#date').value.trim();
 
   if (coursename && coursepar && coursescore && coursedate) {
     const response = await fetch('/dashboard/add', {
       method: 'POST',
       body: JSON.stringify({ coursename, coursepar, coursescore, coursedate }),
       headers: { 'Content-Type': 'application/json' },
     });
 
     if (response.ok) {
       console.log(response)
       document.location.replace('/dashboard');
     } 
   } else {
       alert('Please fill out all field!');
     }
 };
 
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', scoreAddHandler);

