let myLibrary = [new Book('Great Gatby', 'F. Scott Fitzgerald', 208, true),
    new Book('Crime and Punishment', 'Fyodor Dostoevsky', 430, false)];

booksDiv = document.querySelector(".books")

function Book(name, author, pages, read) {
    // the constructor...
    this.name = name
    this.author = author
    this.pages = pages
    this.read = read
}

const addBookToLibrary = (form) => {
    let formData = new FormData(form)
    formData = Object.values(Object.fromEntries(formData))

    const name = formData[0]
    const author = formData[1]
    const pages = formData[2]

    myLibrary.push(new Book(name, author, pages, false))
    renderBooks()
}

const addBook = document.querySelector('#add-book')
addBook.addEventListener('submit', (e)=>{
    e.preventDefault()
    addBookToLibrary(e.target)
})

function renderBooks() {
    booksDiv.innerHTML = `
             <tr>
                <th>Book</th>
                <th>Author</th>
                <th>Pages</th>
                <th>Status</th>
                <th></th>
              </tr>

            `
    let i = 0
    myLibrary.forEach((book) => {
        let row = booksDiv.insertRow(booksDiv.rows.length)
        const name = row.insertCell(0)
        const author = row.insertCell(1)
        const pages = row.insertCell(2)
        const read = row.insertCell(3)
        const deleteButton = row.insertCell(4)
        name.innerHTML = book.name
        author.innerHTML = book.author
        pages.innerHTML = book.pages
        read.innerHTML = `<button class="is-read ${book.read === true ? 'read' : 'unread'}">${book.read === true ? "Read" : "Unread"}</button>`
        deleteButton.innerHTML = `<button data-index=${i} class="delete-button">Delete</button>`
        row.dataset.index = i.toString()
        i++
    })

    const deleteButton = document.querySelectorAll('.delete-button')

    deleteButton.forEach((book) => {
        book.addEventListener('click', (e)=>{
            const index = parseInt(e.target.dataset.index)
            myLibrary.splice(index, 1)
            renderBooks()
        })
    })

    const readButton = document.querySelectorAll('.is-read')

    for (let button of readButton) {
        button.addEventListener('click', (e) => {
            if (e.target.classList.contains('read')) {
                const index = e.target.parentElement.parentElement.dataset.index
                myLibrary[index].read = false
                renderBooks()
            } else {
                const index = e.target.parentElement.parentElement.dataset.index
                myLibrary[index].read = true
                renderBooks()
            }
        })
    }
}



renderBooks()