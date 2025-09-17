//#region Variable Declarations
let email = document.querySelector('#exampleInputEmail1');
let pass = document.querySelector('#exampleInputPassword1');
let sign_in_btn = document.querySelector('.signIn-btn');

let getEmail = localStorage.getItem('email');
let getPassword = localStorage.getItem('password');
//#endregion

//#region Sign-in Event Handling
sign_in_btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (email.value === "" || pass.value === "") {
        alert("Please fill in both fields");
    } else {
        if (getEmail && getPassword && getEmail.trim() === email.value.trim() && getPassword === pass.value) {
            setTimeout(() => {
                location = "../index.html";
            }, 300);
        } else {
            alert("Email or password is incorrect!");
        }
    }
});
//#endregion