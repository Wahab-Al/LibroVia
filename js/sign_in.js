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
        Swal.fire({
            icon: "warning",
            title: "Missing Information",
            text: "Please fill in both fields!",
            confirmButtonColor: "#3085d6"
        });
    } else {
        if (getEmail && getPassword && getEmail.trim() === email.value.trim() && getPassword === pass.value) {
            Swal.fire({
                icon: "success",
                title: "Login Successful!",
                text: "Welcome back!",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                location = "../index.html";
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Email or password is incorrect!",
                confirmButtonColor: "#d33"
            });
        }
    }
});
//#endregion
