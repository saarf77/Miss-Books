import { utilService } from './util-service.js'
import { storageService } from './async-storage.service.js'
import gBooks from '../../data/books.json' assert {type: 'json'}
import gBooks1 from '../../data/booksapi.json' assert {type: 'json'}

export const bookService = {
    query,
    remove,
    save,
    getEmptyBook,
    get,
    addReview,
    removeReview,
    getNextBookId,
    getPrevBookId,
    getGoogleBook,
    getGoogleBooks,
    add,
    _createBooksApi,
    // _createBook
}

const BOOKS_KEY = 'books'
let GOOGLE_BOOKS_KEY = 'phones'

// _createbooks()
_createBooks()

function _createBooks() {
    let books = utilService.loadFromStorage(BOOKS_KEY)
    if(!books || !books.length) {
      books = gBooks
      utilService.saveToStorage(BOOKS_KEY, books)
    }
}
function _createBooksApi() {
    let books = utilService.loadFromStorage(BOOKS_KEY)
    if(!books || !books.length) {
      books = gBooks1
      utilService.saveToStorage(BOOKS_KEY, books)
    }
}


function query() {
    // return utilService.loadFromStorage(BOOKS_KEY)
    return storageService.query(BOOKS_KEY)
}
function get(bookId) {
    return storageService.get(BOOKS_KEY, bookId)

}

function remove(bookId) {
    // const books = query()
    // const idx = books.findIndex(book => book.id === bookId)
    // books.splice(idx, 1)
    // utilService.saveToStorage(BOOKS_KEY, books)
    return storageService.remove(BOOKS_KEY, bookId)
}

function save(book) {
    // book.id = utilService.makeId()
    // const books = query()
    // books.push(book)
    // utilService.saveToStorage(BOOKS_KEY, books)
    // return book
    if (book.id) {
        return storageService.put(BOOKS_KEY, book)
    }
    return storageService.post(BOOKS_KEY, book)
}

// function getEmptyBook() {
//     return { title: '', price: 0 }
// }
function getEmptyBook(title='', price = 0) {
    return { id: '', title, price}
}

function getNextBookId(bookId) {
    return storageService.query(BOOKS_KEY)
        .then(books =>{
            var idx  = books.findIndex(book => book.id === bookId)
            if (idx === books.length-1) idx = -1
            return books[idx + 1].id 
        })
}

function getPrevBookId(bookId) {
    return storageService.query(BOOKS_KEY)
        .then(books =>{
            var idx  = books.findIndex(book => book.id === bookId)
            if (idx === books.length-1) idx = -1
            return books[idx - 1].id 
        })
}

function addReview(bookId, review) {
    review.id = utilService.makeId()
    return storageService.get(BOOKS_KEY, bookId)
      .then(book => {
        if (!book.reviews) book.reviews = []
        book.reviews.push(review)
        return storageService.put(BOOKS_KEY, book)
      })
  }
  
  
  function removeReview(bookId, reviewId) {
    return storageService.get(BOOKS_KEY, bookId)
      .then(book => {
        book.reviews = book.reviews.filter(review => review.id !== reviewId)
        return storageService.put(BOOKS_KEY, book)
      })
  }

//   function _createBook(title, price = 250) {
//     const book = getEmptyBook(title, price)
//     book.id = utilService.makeId() 
//     return book
// }

function add(book) {
    return storageService.post(BOOKS_KEY, book, false)
}

function getGoogleBook(bookId) {
    return storageService.get(GOOGLE_BOOKS_KEY, bookId)
}

function _getDataFromGoogleBooks(items) {
    var books = []
    items.forEach(item => {
        const book = {
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            publishedDate: item.volumeInfo.publishedDate,
            description: item.volumeInfo.description || 'This is a great story about all of us',
            pageCount: item.volumeInfo.pageCount,
            categories: item.volumeInfo.categories || 'No category',
            thumbnail: item.volumeInfo.imageLinks.thumbnail,
            language: item.volumeInfo.language,
            listPrice: {
                amount: 35,
                currencyCode: "EUR",
                isOnSale: false
            }
        }
        books.push(book)
    })
    return Promise.resolve(books)
}

function getGoogleBooks(key = GOOGLE_BOOKS_KEY) {
    GOOGLE_BOOKS_KEY = key
    const googleBooks = utilService.loadFromStorage(GOOGLE_BOOKS_KEY)
    console.log('loading from cache...');
    if (googleBooks) return Promise.resolve(googleBooks)
    console.log('loading from server...');
    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${GOOGLE_BOOKS_KEY}`
    return fetch(url)
        .then(data => data.json())
        .then(({ items }) => {
            return _getDataFromGoogleBooks(items)
                .then(books => {
                    utilService.saveToStorage(GOOGLE_BOOKS_KEY, books)
                    return books
                })
        })
}



















// function _saveBooksToStorage() {
//     utilService.saveToStorage(BOOKS_KEY, books)
// }