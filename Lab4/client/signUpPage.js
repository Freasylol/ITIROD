// localStorage.setItem('bebra', '123')

async function checkForm() {
  event.preventDefault();
  var input1 = document.querySelector(".password-input").value;
  var input2 = document.querySelector(".confirm-password-input").value;

  if (input1 !== input2) {
    alert("Password and confirm password inputs must match");
    return false;
  } else {
    await createUser();
    return true;
  }
}

async function createUser() {
  let usersArr = [];
  let inputs = document.querySelectorAll('.sign-up__form-item input');
  let taskData = 
  {
    username: inputs[0].value,
    email: inputs[1].value,
    password: inputs[2].value
  }

  let result = await fetch('http://localhost:8080/users/reg',  {
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
  if (usersArr.id !== null) {
    localStorage.setItem('userId', usersArr.id);
    window.location.href = 'http://localhost:8080';
  }
 
  return usersArr
}