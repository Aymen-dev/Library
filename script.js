var librarySection = document.querySelector('#library');
var addBookForm = document.querySelector('#addBookForm');
var books = [];


//Book constructor
function Book(title, author, pages, isRead) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}


const addBook = () => {

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const isRead = document.querySelector('#isRead').checked;

    const newBook = new Book(title, author, pages, isRead);

    books.push(newBook);

    displayBooks(books);
}


const deleteBook = (index) => books.splice(index, 1);


const changeReadStatus = (index) => books[index].isRead = !books[index].isRead;



const displayBooks = (books) => {

    librarySection.innerHTML = '';

    books.forEach((book) => {
        const isReadString = book.isRead ? 'Read' : 'Not read yet';
        const isReadStringColor = book.isRead ? 'text-success' : 'text-danger';
        const index = books.indexOf(book);

        const cardHTML = ` <div class="card border-dark mb-3" style="width: 320px; height: auto;">
        <div class="card-header bg-dark-subtle">
            <h4 class="m-0">${book.title}</h4>
        </div>
            <div class="card-body text-secondary">
                <h5 class="card-title">${book.author}</h5>
                    <p class="card-text">${book.pages} pages</p>
                        <b><span class="${isReadStringColor}">${isReadString}</span></b>
            </div>
            <div class="card-footer justify-content-start d-flex">
                <button type="button" class="btn btn-outline-danger delete-btn me-2" data-index="${index}">
                    Delete
                </button>
                <button type="button" class="btn btn-outline-primary mark-btn" data-index="${index}">
                    Mark Read/Unread
                </button>
            </div>
    </div>`;
        librarySection.innerHTML += cardHTML;
    })
}





addBookForm.addEventListener('submit', (event) => {
    event.preventDefault();
})

document.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('delete-btn') || target.classList.contains('mark-btn')) {
        const index = target.getAttribute('data-index');

        if (target.classList.contains('delete-btn')) {
            if (confirm('Delete this book from library ?'))
                deleteBook(index);
        }
        else
            changeReadStatus(index);
    }

    displayBooks(books);
})



