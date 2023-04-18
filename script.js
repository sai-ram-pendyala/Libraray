let cards = document.querySelector(".cards");
let addBtn = document.querySelector("#addBtn");
let styles = `
            * {
                margin: 0;
                padding: 0;
            }

            form {
                margin-bottom: -10px;
                padding: 20px;
                background-color: #393646;
                color: #F4EEE0;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            form > div {
                display: flex;
                /* gap: 10px; */
            }

            form input {
                padding: 5px;
                border: 1px solid #F4EEE0;
                background-color: #393646;
                color: #F4EEE0;
                border-radius: 5px;
                outline: none;
            }
            
            form input[type="checkbox"] {
                width: 20px;
                height: 20px;
                margin-right: 10px;
            }

            .subBtnDiv {
                align-self: center;
            }

            .btn {
                color: #393646;
                background-color: #F4EEE0;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }

            form > div > label {
                flex: 1;
            }`;

let myLibrary = [];

function Book(author, title, numPages, readStatus) {
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.readStatus = readStatus;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    for (let book of myLibrary) {
        let card = document.createElement("div");
        card.className = "card";

        let authorDiv = document.createElement("div");
        authorDiv.textContent = "Author: " + book.author;

        let titleDiv = document.createElement("div");
        titleDiv.textContent = "Title: " + book.title;

        let pagesDiv = document.createElement("div");
        pagesDiv.textContent = "Pages: " + book.numPages;

        let statusDiv = document.createElement("div");
        statusDiv.setAttribute('id', 'statusDiv');
        let statusLabel = document.createElement("label");
        statusLabel.for = "statusCheckbox";
        statusLabel.textContent = "Read Status:";
        statusDiv.append(statusLabel);
        let statusCheckbox = document.createElement("input");
        statusCheckbox.type = "checkbox";
        statusCheckbox.checked = book.readStatus === true;
        statusCheckbox.setAttribute('id', 'checkbox')
        statusDiv.append(statusCheckbox);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "btn";
        deleteBtn.setAttribute("id", "dltBtn");

        card.append(authorDiv, titleDiv, pagesDiv, statusDiv, deleteBtn);
        cards.append(card);

        statusCheckbox.addEventListener("change", () => {
            book.readStatus = statusCheckbox.checked;
        });

        deleteBtn.addEventListener("click", () => {
            card.remove();
            let index = myLibrary.findIndex(
                (item) => item.title === book.title
            );
            myLibrary.splice(index, 1);
        });
    }
}
displayBooks();

addBtn.addEventListener("click", function () {
    let form = document.createElement("form");
    form.id = "form";

    let authorDiv = document.createElement("div");
    authorDiv.innerHTML =
        '<label for="author">Author</label><input type="text" id="author" name="author" required>';

    let titleDiv = document.createElement("div");
    titleDiv.innerHTML =
        '<label for="title">Title</label><input type="text" id="title" name="title" required>';

    let pagesDiv = document.createElement("div");
    pagesDiv.innerHTML =
        '<label for="pages">Pages</label><input type="number" id="pages" name="pages" required>';

    let statusDiv = document.createElement("div");
    statusDiv.innerHTML =
        '<label for="status">Read Status</label><input type="checkbox" name="status">';

    let subBtnDiv = document.createElement("div");
    subBtnDiv.className = "subBtnDiv";
    subBtnDiv.innerHTML =
        '<input id="subBtn" class="btn" type="submit" name="Submit">';

    form.append(authorDiv, titleDiv, pagesDiv, statusDiv, subBtnDiv);

    let formWindow = window.open("", "Form", "width=400,height=210");
    formWindow.document.body.appendChild(form);
    let styleSheet = formWindow.document.createElement("style");
    styleSheet.innerHTML = styles;
    formWindow.document.head.appendChild(styleSheet);


    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let formData = new FormData(form);
        let author = formData.get("author");
        let title = formData.get("title");
        let pages = formData.get("pages");
        let readStatus = formData.get("status") === 'on' ? true: false;

        let book = new Book(author, title, pages, readStatus);
        addBookToLibrary(book);

        formWindow.close();

        cards.innerHTML = "";
        displayBooks();
    });
});
