//#region Variable Declarations
let sign_acc = document.querySelector('.sign-acc')
let sign_accI = document.querySelector('.sign-accI')
let welcomeText = document.querySelector('.welcome')
let logoutBtn = document.querySelector('.logoutBtn')
let cart_icon = document.querySelector('.cart-icon')

let counterBtn = document.querySelector('.counter')

let name_ = localStorage.getItem('name')
let surName = localStorage.getItem('surname')
//#endregion

//#region Cart Section Handling
if (localStorage.getItem('email')) {
    /**
     * Example alternatives:
     * sign_acc.classList.add('d-none')
     * sign_accI.classList.add('d-none')
     */
    sign_acc.remove()
    sign_accI.remove()
    welcomeText.classList.remove('d-none')
    logoutBtn.classList.remove('d-none')
    cart_icon.classList.remove('d-none')
    counterBtn.classList.remove('d-none')
    welcomeText.innerHTML = `Welcome, ${name_} ${surName} `
}
//#endregion

// element.classList.toggle('active') → toggles class on/off
// element.classList.contains('d-none') → returns true/false

//#region Logout Event Handling
logoutBtn.addEventListener('click', () => {
    localStorage.clear()
    location = "index.html"
})
//#endregion
