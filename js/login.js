var loginBtn = document.getElementById("loginBtn");
var registerBtn = document.getElementById("registerBtn");
var loginform = document.getElementById("loginform");
var registerform = document.getElementById("registerform");
var forgot = document.getElementById("forgot");

registerBtn.onclick = function () {
  registerform.style.left = '0px';
  registerform.style.opacity = '1';
  loginform.style.left = '-500px';
  loginform.style.opacity = '0';
  forgot.style.left = '-500px';
  forgot.style.opacity = '0';
  registerBtn.classList.add('active');
  loginBtn.classList.remove('active');

}

loginBtn.onclick = function () {
  loginform.style.left = '0px';
  loginform.style.opacity = '1';
  forgot.style.left = '0px';
  forgot.style.opacity = '1';
  registerform.style = '500px';
  loginBtn.classList.add('active');
  registerBtn.classList.remove('active');
  registerform.style.opacity = '0';
}
