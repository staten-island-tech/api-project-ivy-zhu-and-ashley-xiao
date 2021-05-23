import { DOMSelectors } from "./DOM";

const key = "usCi4RaBNDKBfG3jWXiTgwjpfSJ6aWG4";

const listen = function () {
    DOMSelectors.searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        DOMSelectors.searchResults.innerHTML= ""
        const searchParams = DOMSelectors.searchInput.value;
        const searchQuery = async function () {
            try {
                const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?title=${searchParams}&api-key=${key}`);
                const data = await response.json();
                const results = data.results;
                
                function checkForBlank() {
                    if (searchParams === "") {
                        DOMSelectors.searchResults.classList.add("hidden");
                        DOMSelectors.emptyInput.classList.remove("hidden");
                    } else {
                        DOMSelectors.searchResults.classList.remove("hidden")
                        DOMSelectors.emptyInput.classList.add("hidden");
                    }
                }
                checkForBlank();

                function noResults() {
                    if (data.num_results === 0) {
                        DOMSelectors.searchResults.classList.add("hidden");
                        DOMSelectors.bookUnfound.classList.remove("hidden");
                    } else {
                        DOMSelectors.searchResults.classList.remove("hidden")
                        DOMSelectors.bookUnfound.classList.add("hidden");
                    }
                }
                noResults();

                function displayBooks() {
                    results.forEach((book) => {
                        const reviews = book.reviews[0];
                        DOMSelectors.searchResults.insertAdjacentHTML("beforeend", 
                        `<div class="search-book">
                        <h1 class="searched-book-title">${book.title}</h1>
                        <p class="searched-book-author">${book.author}</p>
                        <div class="review-btn"><a class="book-review" href="${reviews.sunday_review_link}">Reviews</a></div>
                        </div>`);
                    });
                }
                displayBooks();
        
            } catch (error) {
                console.log(error);
                alert("something went wrong")
            }
        };
        searchQuery();
    });
}
listen();