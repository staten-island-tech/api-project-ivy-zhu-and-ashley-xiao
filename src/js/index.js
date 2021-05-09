import { DOMSelectors } from "./DOM";

const key = "usCi4RaBNDKBfG3jWXiTgwjpfSJ6aWG4";

const query = async function () {
    try {
        const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${key}`);
        const data = await response.json();
        const results = data.results;
        results.books.forEach((book) => {
            DOMSelectors.searchResult.insertAdjacentHTML("beforeend", 
            `<div class="searched-books">
            <img
            src="${book.book_image}"
            alt=""
            class="book-cover">
            <div class="book-info">
                <h1 class="book-title">${book.title}</h1>
                <p class="book-author">${book.contributor}</p>
                <p class="book-description">
                    ${book.description}
                </p>
                <div class="buy-btn">
                    <a class="shop-btn" href="${book.amazon_product_url}">Buy Now</a></div>
                </div>
            </div>
        </div>`);
        });
    } catch (error) {
        console.log(error);
        alert("something went wrong")
    }
};
query();