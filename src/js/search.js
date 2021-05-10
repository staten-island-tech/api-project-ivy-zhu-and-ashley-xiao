import { DOMSelectors } from "./DOM";

const key = "usCi4RaBNDKBfG3jWXiTgwjpfSJ6aWG4";
let currentPage

const query = async function () {
    try {
        const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${key}`);
        const data = await response.json();
        const results = data.results;
        const lists = results.lists;
        currentPage = 0;

        function displayBooks() {
            lists[currentPage].books.forEach((book) => {
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
        }
        displayBooks();

        DOMSelectors.nextButton.addEventListener('click', nextPage)

        function nextPage(){
            if (currentPage === lists.length -1) {
                
            } else {
                currentPage++
                changePage()
            }
        }

        DOMSelectors.previousButton.addEventListener('click', previousPage);

        function previousPage(){
            if (currentPage === 0) {

            } else {
                currentPage--
                changePage()
            }
        }

        function changePage() {
            DOMSelectors.searchResult.innerHTML= "";
            displayBooks();
        }

    } catch (error) {
        console.log(error);
        alert("something went wrong")
    }
};
query();