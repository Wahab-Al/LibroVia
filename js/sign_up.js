//#region Variable Declarations
let surname = document.querySelector('.surname-inp')
let name = document.querySelector('.name-inp')
let email = document.querySelector('.email-inp')
let pass = document.querySelector('.pass-inp')
let sign_up_btn = document.querySelector('.signUp-btn')
//#endregion

//#region sign-up Event Handling
sign_up_btn.addEventListener('click', (e)=>{
    e.preventDefault()
    if(surname.value != "" || name.value != "" || email.value != "" || pass.value != ""){
        alert('Account created successfully')
        setTimeout(()=>{
            location = "../html/sign_in.html"
            localStorage.setItem('surname', surname.value)
            localStorage.setItem('name', name.value)
            localStorage.setItem('email', email.value)
            localStorage.setItem('password', pass.value)
        }, 400)
    }else
        alert("please fill valid data.")
})
//#endregion