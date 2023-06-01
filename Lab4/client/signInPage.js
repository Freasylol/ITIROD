// localStorage.setItem('isAuth', true);

// let user = 

// localStorage.setItem('isAuth', true);

async function loginUser() {
  event.preventDefault();
  let usersArr = [];
  let inputs = document.querySelectorAll('.sign-in__form-item input');
  let taskData = 
  {
    email: inputs[0].value,
    password: inputs[1].value
  }

  let result = await fetch('http://localhost:8080/users/login',  {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
      body: JSON.stringify(taskData)

  }).then(res => {
    return res.json();
  })
  .then(data => {
    return data;
  })
  .catch(error => console.log(error))

  
  usersArr = await result;
  console.log(usersArr);
  if (usersArr.id !== null || usersArr.id !== "null") {
    localStorage.setItem('userId', usersArr.id);
    window.location.href = 'http://localhost:8080';
  }

  return usersArr
}