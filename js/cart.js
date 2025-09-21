//#region Elements
/// consts → 
const books = JSON.parse(localStorage.getItem('books')) || []
const addedBookIntoCart = JSON.parse(localStorage.getItem('addedBookIntoCart')) || []
const cartMainPage = document.querySelector('.cart-main-row')
const favoriteStore_ = JSON.parse(localStorage.getItem('favoriteStore')) || []
const priceContainer = document.querySelector('.price-container')
const signUpBtn_ = document.querySelector('.signUpBtn');
const signInBtn_ = document.querySelector('.signInBtn');

/// let →
let favoriteBooksContainer = document.querySelector('.favorite-books')

let bookCounter = localStorage.getItem('bookCounter') || 0;
document.querySelector('.counter').textContent = bookCounter;

///Restore button states from storage
let bookBtnStates = JSON.parse(localStorage.getItem('bookBtnStates')) || {};
//#endregion

//#region Sign in/up navigation
signUpBtn_.addEventListener('click', () => location.href = '../html/sign_up.html');
signInBtn_.addEventListener('click', () => location.href = '../html/sign_in.html');
//#endregion

//#region Helper → update homepage button state
function updateBookBtnUI(id, added) {
    const btn = document.querySelector(`.intoCartBtn[data-id="${id}"]`);
    if (added) {
    bookBtnStates[id] = { added: true, text: 'Remove from cart' };
        if (btn) {
            btn.classList.add('changeBtnStyle');
            btn.textContent = 'Remove from cart';
        }
    } else {
        bookBtnStates[id] = { added: false, text: 'Add to cart' };
        if (btn) {
            btn.classList.remove('changeBtnStyle');
            btn.textContent = 'Add to cart';
        }
    }
    localStorage.setItem('bookBtnStates', JSON.stringify(bookBtnStates));
}
//#endregion

//#region Show books on cart homepage
function displayBooksInCart() {
  if (addedBookIntoCart.length < 1) {
    cartMainPage.innerHTML = `
      <div class="text-center my-5">
        <img src="../img/emptyCart.jpg" alt="empty cart" class="img-fluid mb-3 rounded rounded-3" style="max-width:300px;">
        <p class="text-muted">Your cart is empty</p>
      </div>
    `;
    return; 
  }
    cartMainPage.innerHTML = `
    <div class="row">
        ${addedBookIntoCart
        .map(book => {
            if (book.addedQuantity > 0) {
            return `
                <div class="col-md-6" id="cart-item-${book.id}">
                <div class="card m-2 mb-3">
                    <div class="row g-0">
                    <div class="col-md-4 d-none d-md-block">
                        <img src="${book.imgUrl}" class="img-fluid rounded-start" alt="${book.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">${book.category}</p>
                            <p class="card-text mb-3">
                                <small class="text-body-secondary">${book.price}€</small>
                            </p>
                            <div class="d-flex align-items-center gap-3 mt-4">
                            <div class="removeItem" onClick="decreaseQuantity(${book.id})">
                                <i class="fa-solid fa-minus fa-lg text-danger"></i>
                            </div>
                            <span class="numberOfItem">${book.addedQuantity}</span>
                            <div class="increaseItem" onClick="increaseQuantity(${book.id})">
                                <i class="fa-solid fa-plus fa-lg text-success"></i>
                            </div>
                            <button class="btn btn-outline-dark rounded shadow intoCartBtn ms-auto w-75" onClick="removeFromCart(${book.id})">
                                <i class="fa-solid fa-trash fa-lg text-danger"></i>
                            </button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            `;
            }
            return '';
        })
        .join('')}
    </div>
    `;
}
displayBooksInCart()
//#endregion

//#region Display favorite books
function displayFavoritesBook() {
    favoriteBooksContainer.innerHTML = favoriteStore_.map(book => {
    return `
        <div class="col col-md-4 mb-5">
            <div class="card index-card mt-4 h-100 rounded rounded-5 bg-white text-dark shadow">
                <img src="${book.imgUrl}" class="card-img-top rounded-5 shadow" alt="${book.title}">
                <div class="card-body d-flex flex-column align-items-center text-center">
                    <h5 class="card-title text-uppercase">${book.title}</h5>
                    <p class="card-text">Category: ${book.category}</p>
                    <i class="fa-solid fa-heart fs-4 heartIcon mb-2" data-id="${book.id}" style="color: maroon" onClick="removeFromFavorite(${book.id})"></i>
                </div>
            </div>
        </div>
    `;
    }).join('');
}
document.addEventListener('DOMContentLoaded', displayFavoritesBook)
//#endregion

//#region Display total price of books in cart
function getTotalPrice() {
    let totalPrice = 0
    addedBookIntoCart.forEach(book => {
        if (book.addedQuantity > 0) {
        totalPrice += book.price * book.addedQuantity
        }
    })
    return totalPrice
}
priceContainer.innerHTML = 'Total price: ' + getTotalPrice() + '€'
//#endregion

//#region Increase quantity in cart
function increaseQuantity(id) {
    let book = addedBookIntoCart.find(b => b.id === Number(id));
    if (!book) return;

    book.addedQuantity++;

  ///Update UI in cart page
    const span = document.querySelector(`#cart-item-${id} .numberOfItem`);
    if (span) span.textContent = book.addedQuantity;

  ///Update catalog book quantity
    let catalogBook = books.find(b => b.id === id);
    if (catalogBook) catalogBook.addedQuantity = book.addedQuantity;

  ///Save to localStorage
    localStorage.setItem('addedBookIntoCart', JSON.stringify(addedBookIntoCart));
    localStorage.setItem('books', JSON.stringify(books));

  ///Update cart icon counter
    updateCartCounter();
  ///update total price
    priceContainer.innerHTML = 'Total price: ' + getTotalPrice() + '€';
}
//#endregion

//#region Decrease quantity in cart
function decreaseQuantity(id) {
    let book = addedBookIntoCart.find(b => b.id === Number(id));
    if (!book) return;

    book.addedQuantity--;

  ///Remove book if quantity reaches 0
    if (book.addedQuantity <= 0) {
    const index = addedBookIntoCart.findIndex(b => b.id === id);
    if (index !== -1) addedBookIntoCart.splice(index, 1);

    const bookCard = document.querySelector(`#cart-item-${id}`);
    if (bookCard) bookCard.remove();

    ///reset button state on homepage
    updateBookBtnUI(id, false);
    } else {
    ///Update UI
    const span = document.querySelector(`#cart-item-${id} .numberOfItem`);
    if (span) span.textContent = book.addedQuantity;
}

  ///Update catalog book
    let catalogBook = books.find(b => b.id === id);
    if (catalogBook) catalogBook.addedQuantity = book.addedQuantity;

  ///Save to localStorage
    localStorage.setItem('addedBookIntoCart', JSON.stringify(addedBookIntoCart));
    localStorage.setItem('books', JSON.stringify(books));

  ///Update cart icon counter
    updateCartCounter();
  ///update total price
    priceContainer.innerHTML = 'Total price: ' + getTotalPrice() + '€';
}
//#endregion

//#region Recalculates the total number of books in the cart
function updateCartCounter() {
    bookCounter = addedBookIntoCart.reduce((sum, book) => sum + book.addedQuantity, 0);
    document.querySelector('.counter').textContent = bookCounter;
    localStorage.setItem('bookCounter', bookCounter);
}
//#endregion

//#region remove the book from cart
function removeFromCart(id) {
  ///Find index of the book in the cart
    const index = addedBookIntoCart.findIndex(b => b.id === Number(id));
    if (index === -1) return;

  ///Remove book from cart array
    addedBookIntoCart.splice(index, 1);

  ///Remove book card from DOM
    const bookCard = document.getElementById(`cart-item-${id}`);
    if (bookCard) bookCard.remove();

  ///Update localStorage
    localStorage.setItem('addedBookIntoCart', JSON.stringify(addedBookIntoCart));

  ///Update catalog book quantity to 0
    const catalogBook = books.find(b => b.id === Number(id));
    if (catalogBook) catalogBook.addedQuantity = 0;
    localStorage.setItem('books', JSON.stringify(books));

  ///Update cart icon counter
    updateCartCounter();

  ///update total price
    priceContainer.innerHTML = 'Total price: ' + getTotalPrice() + '€';

  ///reset button state on homepage
    updateBookBtnUI(id, false);
}
//#endregion

//#region remove book of favorite list
function removeFromFavorite(id) {
    /// Remove book from favoriteStore array
    const index = favoriteStore_.findIndex(book => book.id === Number(id));
    if (index === -1) return;
    favoriteStore_.splice(index, 1);
    localStorage.setItem('favoriteStore', JSON.stringify(favoriteStore_));

    /// Remove book card from DOM
    const bookCard = document.querySelector(`.favorite-books [data-id="${id}"]`)?.closest('.col');
    if (bookCard) bookCard.remove();
}

//#endregion
