//#region Elements
/// consts →
const signUpBtn = document.querySelector('.signUpBtn');
const signInBtn = document.querySelector('.signInBtn');
const mainPage = document.querySelector('.index-main-row');
const displayCartPopup = document.querySelector('.viewAllItems');
const addedBookContainer = document.querySelector('.added-book-container');
const cartIcon = document.querySelector('.cart');
const searchSelect = document.querySelector('.form-select');
const searchInputField = document.querySelector('.search');

const allBooks = [
  { id: 1, title: "The Great Gatsby", imgUrl: "https://covers.openlibrary.org/b/id/7222246-L.jpg", price: 50, category: "Classic", addedQuantity: 0 },
  { id: 2, title: "Atomic Habits", imgUrl: "https://covers.openlibrary.org/b/id/11153233-L.jpg", price: 75, category: "Self-Help", addedQuantity: 0 },
  { id: 3, title: "To Kill a Mockingbird", imgUrl: "https://covers.openlibrary.org/b/id/9871352-L.jpg", price: 55, category: "Classic", addedQuantity: 0 },
  { id: 4, title: "The Catcher in the Rye", imgUrl: "https://covers.openlibrary.org/b/id/8231856-L.jpg", price: 42, category: "Classic", addedQuantity: 0 },
  { id: 5, title: "Pride and Prejudice", imgUrl: "https://covers.openlibrary.org/b/id/8091016-L.jpg", price: 65, category: "Romance", addedQuantity: 0 },
  { id: 6, title: "The Hobbit", imgUrl: "https://covers.openlibrary.org/b/id/6979861-L.jpg", price: 70, category: "Fantasy", addedQuantity: 0 },
  { id: 7, title: "Harry Potter and the Sorcerer's Stone", imgUrl: "https://covers.openlibrary.org/b/id/7884866-L.jpg", price: 85, category: "Fantasy", addedQuantity: 0 },
  { id: 8, title: "The Fellowship of the Ring", imgUrl: "https://covers.openlibrary.org/b/id/7992031-L.jpg", price: 90, category: "Fantasy", addedQuantity: 0 },
  { id: 9, title: "The Da Vinci Code", imgUrl: "https://covers.openlibrary.org/b/id/240726-L.jpg", price: 60, category: "Thriller", addedQuantity: 0 },
  { id: 10, title: "The Alchemist", imgUrl: "https://covers.openlibrary.org/b/id/8128691-L.jpg", price: 55, category: "Philosophy", addedQuantity: 0 },
  { id: 11, title: "Sapiens: A Brief History of Humankind", imgUrl: "https://covers.openlibrary.org/b/id/8377224-L.jpg", price: 95, category: "History", addedQuantity: 0 },
  { id: 12, title: "1984", imgUrl: "https://covers.openlibrary.org/b/id/7222246-L.jpg", price: 45, category: "Dystopian", addedQuantity: 0 },
  { id: 13, title: "Clean Code", imgUrl: "https://covers.openlibrary.org/b/id/8155406-L.jpg", price: 80, category: "Programming", addedQuantity: 0 },
  { id: 14, title: "JavaScript: The Good Parts", imgUrl: "https://covers.openlibrary.org/b/id/8232000-L.jpg", price: 65, category: "Programming", addedQuantity: 0 },
  { id: 15, title: "Eloquent JavaScript", imgUrl: "https://covers.openlibrary.org/b/id/8155401-L.jpg", price: 70, category: "Programming", addedQuantity: 0 },
  { id: 16, title: "Deep Work", imgUrl: "https://covers.openlibrary.org/b/id/8232100-L.jpg", price: 50, category: "Self-Help", addedQuantity: 0 },
  { id: 17, title: "The Pragmatic Programmer", imgUrl: "https://covers.openlibrary.org/b/id/8232150-L.jpg", price: 85, category: "Programming", addedQuantity: 0 },
  { id: 18, title: "Astrophysics for People in a Hurry", imgUrl: "https://covers.openlibrary.org/b/id/8232200-L.jpg", price: 60, category: "Science", addedQuantity: 0 },
  { id: 19, title: "Artificial Intelligence: A Modern Approach", imgUrl: "https://covers.openlibrary.org/b/id/8232250-L.jpg", price: 95, category: "Technology", addedQuantity: 0 },
  { id: 20, title: "Cracking the Coding Interview", imgUrl: "https://covers.openlibrary.org/b/id/8232300-L.jpg", price: 90, category: "Programming", addedQuantity: 0 },
  { id: 21, title: "Thinking, Fast and Slow", imgUrl: "https://covers.openlibrary.org/b/id/8232350-L.jpg", price: 70, category: "Psychology", addedQuantity: 0 },
  { id: 22, title: "The Lean Startup", imgUrl: "https://covers.openlibrary.org/b/id/8232400-L.jpg", price: 60, category: "Business", addedQuantity: 0 }
];


/// Save books in localStorage
if (!localStorage.getItem('books')) {
  localStorage.setItem('books', JSON.stringify(allBooks));
}

/// let →
let books = JSON.parse(localStorage.getItem('books')) || [];
let addedBookIntoCart = JSON.parse(localStorage.getItem('addedBookIntoCart')) || [];
let bookCounter = Number(localStorage.getItem('bookCounter')) || addedBookIntoCart.reduce((s,b)=> s + b.addedQuantity, 0) || 0;
let favoriteStore = JSON.parse(localStorage.getItem('favoriteStore')) || [];
let bookBtnStates = JSON.parse(localStorage.getItem('bookBtnStates')) || {};
let heartIconStates = JSON.parse(localStorage.getItem('heartIconStates')) || {};

//#endregion

//#region Sign in/up navigation
signUpBtn.addEventListener('click', () => location.href = '../html/sign_up.html');
signInBtn.addEventListener('click', () => location.href = '../html/sign_in.html');
//#endregion

//#region Show books on homepage
function showBooks() {
  mainPage.innerHTML = books.map(book => {
    return `
      <div class="col">
        <div class="card index-card mt-4 h-100 rounded rounded-5 bg-white text-dark shadow">
          <img src="${book.imgUrl}" class="card-img-top rounded-5 shadow" alt="${book.title}">
          <div class="card-body d-flex flex-column align-items-center text-center">
              <h5 class="card-title text-uppercase">${book.title}</h5>
              <p class="card-text">Price: ${book.price}€</p>
              <p class="card-text">Category: ${book.category}</p>
              <i class="fa-solid fa-heart fs-4 heartIcon mb-2" 
                data-id="${book.id}" 
                onClick="addToFavoriteStore(${book.id}, this)">
              </i>
              <button class="btn btn-outline-dark mt-auto rounded rounded-3 shadow intoCartBtn" 
                data-id="${book.id}" 
                onClick="intoCart(${book.id}, this)">Add to cart
              </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}
//#endregion

//#region update a specific main-page button UI and state
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


//#region check if book is already added to cart
function isBookAddedToCart(id, addedBooks, selectedBook, btn) {
  let isBookInCart = addedBooks.findIndex(currentBook => currentBook.id === id);

  if (isBookInCart === -1) {
    addedBooks.push(selectedBook);
    bookCounter++;
    selectedBook.addedQuantity = 1;
    // update main page button state
    updateBookBtnUI(id, true);
  } else {
    addedBooks.splice(isBookInCart, 1);
    bookCounter--;
    selectedBook.addedQuantity = 0;
    // update main page button state
    updateBookBtnUI(id, false);
  }
}
//#endregion

//#region add book to cart
function intoCart(id, btn) {
  if (!localStorage.getItem('email')) {
    location.href = '../html/sign_in.html';
    return;
  }

  let selectedBook = books.find(book => book.id === id);
  if (!selectedBook) return;

  isBookAddedToCart(id, addedBookIntoCart, selectedBook, btn);

  /// to save cart state
  localStorage.setItem('addedBookIntoCart', JSON.stringify(addedBookIntoCart));

  /// to save updated books list
  localStorage.setItem('books', JSON.stringify(books));

  /// to save counter
  localStorage.setItem('bookCounter', String(bookCounter));

  /// update counter UI
  document.querySelector('.counter').textContent = bookCounter;

  /// show book in popup
  bookInCartPopup(selectedBook);
}
//#endregion

//#region Restore button states on page load
function restoreButtons() {
  const buttons = document.querySelectorAll('.intoCartBtn');

  buttons.forEach(btn => {
    const id = btn.dataset.id;
    if (bookBtnStates[id] && bookBtnStates[id].added) {
      btn.classList.add('changeBtnStyle');
      btn.textContent = bookBtnStates[id].text;
    } else {
      btn.classList.remove('changeBtnStyle');
      btn.textContent = 'Add to cart';
    }
  });

  const heartBtn = document.querySelectorAll('.heartIcon');
  heartBtn.forEach(btn => {
    const id = btn.dataset.id;
    if (heartIconStates[id] && heartIconStates[id].added) {
      btn.classList.add('changeHeartIconStyle');
    } else {
      btn.classList.remove('changeHeartIconStyle');
    }
  });

  bookCounter = Number(localStorage.getItem('bookCounter')) || addedBookIntoCart.reduce((s,b)=> s + b.addedQuantity, 0) || 0;
  document.querySelector('.counter').textContent = bookCounter;
}
//#endregion

//#region Display cart books in popup
function bookInCartPopup(selectedBook) {
  const bookElementId = `cart-item-${selectedBook.id}`;
  if (selectedBook.addedQuantity > 0) {
    /// if book is not already displayed in popup, create it
    if (!document.getElementById(bookElementId)) {
      addedBookContainer.insertAdjacentHTML('beforeend', `
        <div id="${bookElementId}" class="border border-1 rounded rounded-1 w-100 mt-1 mb-1 p-2">
          <div class="d-flex justify-content-between">
            <h5>${selectedBook.title}</h5>
            <p style="color: white">${selectedBook.price}€</p>
          </div>
          <div class="d-flex align-items-center gap-3 mt-4">
            <div class="removeItem">
              <i class="fa-solid fa-minus fa-lg text-danger" onclick="decreaseQuantity(${selectedBook.id})"></i>
            </div>
            <span class="numberOfItem">${selectedBook.addedQuantity}</span>
            <div class="increaseItem">
              <i class="fa-solid fa-plus fa-lg text-success" onclick="increaseQuantity(${selectedBook.id})"></i>
            </div>
          </div>
        </div>
      `);
    } else {
      /// update the quantity if already exists
      const span = document.querySelector(`#${bookElementId} .numberOfItem`);
      if (span) span.textContent = selectedBook.addedQuantity;
    }
  } else {
    /// remove book from popup if quantity is 0
    const bookElement = document.getElementById(bookElementId);
    if (bookElement) {
      bookElement.remove();
    }
  }
}
//#endregion

//#region Cart Popup Display
if (localStorage.getItem('email')) {
  cartIcon.addEventListener('click', (e) => {
    e.stopPropagation();

    if (addedBookIntoCart.length > 0) {
      displayCartPopup.style.display = 'block';
    } else {
      window.location.href = '../html/cart.html';
    }
  });

  document.addEventListener('click', (e) => {
    if (!displayCartPopup.contains(e.target) && !cartIcon.contains(e.target)) {
      displayCartPopup.style.display = 'none';
    }
  });
}

//#endregion

//#region Recalculates the total number of books in the cart, update UI + storage
function updateCartCounter() {
  bookCounter = Number(addedBookIntoCart.reduce((sum, book) => sum + (book.addedQuantity || 0), 0));
  document.querySelector('.counter').textContent = bookCounter;
  localStorage.setItem('bookCounter', String(bookCounter));
}
//#endregion

//#region increase quantity
function increaseQuantity(id) {
  let id_ = Number(id);
  let book = addedBookIntoCart.find(book => book.id === id_);
  if (book) {
    book.addedQuantity++;

    /// update UI in popup (or create it if missing)
    const span = document.querySelector(`#cart-item-${id_} .numberOfItem`);
    if (span) {
      span.textContent = book.addedQuantity;
    } else {
      bookInCartPopup(book);
    }

    /// update books list too
    let catalogBook = books.find(b => b.id === id_);
    if (catalogBook) catalogBook.addedQuantity = book.addedQuantity;

    /// save state
    localStorage.setItem('addedBookIntoCart', JSON.stringify(addedBookIntoCart));
    localStorage.setItem('books', JSON.stringify(books));

    /// update counter
    updateCartCounter();
  }
}
//#endregion

//#region decrease quantity
function decreaseQuantity(id) {
  let id_ = Number(id);
  let book = addedBookIntoCart.find(book => book.id === id_);
  if (!book) return;

  book.addedQuantity--;

  if (book.addedQuantity <= 0) {
    /// remove book from cart array
    addedBookIntoCart = addedBookIntoCart.filter(b => b.id !== id_);

    /// remove from popup DOM
    const bookElement = document.getElementById(`cart-item-${id_}`);
    if (bookElement) bookElement.remove();

    /// reset main catalog quantity and main-page button
    let catalogBook = books.find(b => b.id === id_);
    if (catalogBook) catalogBook.addedQuantity = 0;

    updateBookBtnUI(id_, false);
  } else {
    /// update UI quantity in popup
    const span = document.querySelector(`#cart-item-${id_} .numberOfItem`);
    if (span) span.textContent = book.addedQuantity;

    /// update catalog
    let catalogBook = books.find(b => b.id === id_);
    if (catalogBook) catalogBook.addedQuantity = book.addedQuantity;
  }

  /// save state
  localStorage.setItem('addedBookIntoCart', JSON.stringify(addedBookIntoCart));
  localStorage.setItem('books', JSON.stringify(books));
  localStorage.setItem('bookBtnStates', JSON.stringify(bookBtnStates));

  /// update counter
  updateCartCounter();
}
//#endregion

//#region remove the book from cart (trash button)
function removeFromCart(id) {
  let id_ = Number(id);
  const index = addedBookIntoCart.findIndex(b => b.id === id_);
  if (index === -1) return;

  /// remove from cart array
  addedBookIntoCart.splice(index, 1);

  /// remove DOM item
  const bookElement = document.getElementById(`cart-item-${id_}`);
  if (bookElement) bookElement.remove();

  /// reset catalog
  let catalogBook = books.find(b => b.id === id_);
  if (catalogBook) catalogBook.addedQuantity = 0;

  /// reset button UI
  updateBookBtnUI(id_, false);

  localStorage.setItem('addedBookIntoCart', JSON.stringify(addedBookIntoCart));
  localStorage.setItem('books', JSON.stringify(books));
  localStorage.setItem('bookBtnStates', JSON.stringify(bookBtnStates));

  /// update counter
  updateCartCounter();

  /// update total price display if you have a function or element
  if (typeof getTotalPrice === 'function' && document.querySelector('.price-container')) {
    document.querySelector('.price-container').innerHTML = 'Total price: ' + getTotalPrice() + '€';
  }
}
//#endregion

//#region check if book is already added to favorite store
function isBookAddedToFavoriteStore(id, addedBooks, selectedBook, btn) {
  let isBookInCart = addedBooks.findIndex(currentBook => currentBook.id === id);
  if(isBookInCart === -1){
    addedBooks.push(selectedBook);
    btn.classList.add('changeHeartIconStyle');
    heartIconStates[id] = { added: true };
  } else {
    addedBooks.splice(isBookInCart, 1);
    btn.classList.remove('changeHeartIconStyle');
    heartIconStates[id] = { added: false };
  }
  localStorage.setItem('favoriteStore', JSON.stringify(favoriteStore));
  localStorage.setItem('heartIconStates', JSON.stringify(heartIconStates));
}

//#endregion

//#region add book to favorite page
function addToFavoriteStore(id, btn) {
  if (!localStorage.getItem('email')) {
    location.href = '../html/sign_in.html';
    return;
  }
  let selectedBook = books.find(book => book.id === id);
  if (!selectedBook) return;
  isBookAddedToFavoriteStore(id, favoriteStore, selectedBook, btn);
}
//#endregion

//#region Restores the cart popup content when the page is reloaded
function restoreCartPopup() {
  addedBookIntoCart.forEach(book => {
    if (book.addedQuantity > 0) {
      bookInCartPopup(book);
    }
  });
}
//#endregion

//#region Navigate to cart page
const navigateToCart = document.querySelector('#toCart');
if (navigateToCart) {
  navigateToCart.addEventListener('click', (e) => {
    e.preventDefault();
    // ensure popup closed and navigate
    displayCartPopup.style.display = 'none';
    window.location.href = '../html/cart.html';
  });
}
//#endregion


//#region search/filter 
function filterBooks() {
  const query = searchInputField.value.toLowerCase().trim();
  const filterBy = searchSelect.value; /// the option on select tag "1" = name, "2" = category

  const filteredBooks = books.filter(book => {
    if (filterBy === "1") {
      return book.title.toLowerCase().includes(query);
    } else if (filterBy === "2") {
      return book.category.toLowerCase().includes(query);
    }
    return true;
  });

  if (filteredBooks.length < 1) {
    mainPage.innerHTML = `
      <div class="d-flex flex-column justify-content-center align-items-center"
        style="width:100vw; height:100vh;">
      <img src="../img/9214769.jpg" 
          alt="empty cart" 
          class="img-fluid rounded-3 mb-3"
          style="width:100%; height:100%; object-fit:cover;">
      <p class="text-muted position-absolute bottom-0 mb-4 fs-4">Book not found</p>
    </div>
  `;
    return; 
  }

  /// Display filtered books
  mainPage.innerHTML = filteredBooks.map(book => {
    return `
      <div class="col">
        <div class="card index-card mt-4 h-100 rounded rounded-5 bg-white text-dark shadow">
          <img src="${book.imgUrl}" class="card-img-top rounded-5 shadow" alt="${book.title}">
          <div class="card-body d-flex flex-column align-items-center text-center">
              <h5 class="card-title text-uppercase">${book.title}</h5>
              <p class="card-text">Price: ${book.price}€</p>
              <p class="card-text">Category: ${book.category}</p>
              <i class="fa-solid fa-heart fs-4 heartIcon mb-2" 
                data-id="${book.id}" 
                onClick="addToFavoriteStore(${book.id}, this)">
              </i>
              <button class="btn btn-outline-dark mt-auto rounded rounded-3 shadow intoCartBtn" 
                data-id="${book.id}" 
                onClick="intoCart(${book.id}, this)">Add to cart
              </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  /// Restore buttons and hearts for filtered books
  restoreButtons();
}

// Event listener for live filtering
searchInputField.addEventListener('input', filterBooks);
searchSelect.addEventListener('change', filterBooks);
//#endregion


/// run on page load
showBooks();
restoreButtons();
restoreCartPopup();