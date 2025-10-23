//#region Variable Declarations
let surname = document.querySelector('.surname-inp');
let name = document.querySelector('.name-inp');
let email = document.querySelector('.email-inp');
let pass = document.querySelector('.pass-inp');
let sign_up_btn = document.querySelector('.signUp-btn');
//#endregion

//#region sign-up Event Handling
sign_up_btn.addEventListener('click', (e) => {
    e.preventDefault();

    if (surname.value !== "" && name.value !== "" && email.value !== "" && pass.value !== "") {
        // ✅ Success alert
        Swal.fire({
            icon: "success",
            title: "Account Created!",
            text: "Your account has been created successfully.",
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            // Save user data
            localStorage.setItem('surname', surname.value);
            localStorage.setItem('name', name.value);
            localStorage.setItem('email', email.value);
            localStorage.setItem('password', pass.value);

            // Redirect after short delay
            location = "../html/sign_in.html";
        });
    } else {
        Swal.fire({
            icon: "warning",
            title: "Incomplete Information",
            text: "Please fill in all fields before signing up.",
            confirmButtonColor: "#3085d6"
        });
    }
});
//#endregion
