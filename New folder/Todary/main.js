
var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var urlRegex =
  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+([/?].*)?$/;
var urlAlert = document.getElementById("urlAlert");
var bookList = [];
if (localStorage.getItem("bookStorage") != null) {
  bookList = JSON.parse(localStorage.getItem("bookStorage"));
  displayBooks();
}

function addBook() {
  book = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
  };
  bookList.push(book);
  localStorage.setItem("bookStorage", JSON.stringify(bookList));

  displayBooks();
  clearBooks();
}

function displayBooks() {
  var cartona = "";
  for (var i = 0; i < bookList.length; i++) {
    cartona += `
      
          <tr>
            <td>${i + 1}</td>
            <td>${bookList[i].name}</td>
            <td>
              <button onclick="visitBookmark('${
                bookList[i].url
              }')" class="btn btn-outline-warning px-4 py-1">
                <i class="fa-solid fa-eye"></i>
              </button>
            </td>
            <td>
              <button  onclick="deletBook(${i})" class="btn btn-outline-danger px-4 py-1">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          
          </tr>
        
    
    `;
  }
  document.getElementById("table").innerHTML = cartona;
}
function deletBook(index) {
  bookList.splice(index, 1);
  displayBooks();
  localStorage.setItem("bookStorage", JSON.stringify(bookList));
}

function clearBooks() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
}

function validateUrl(urlValue) {
  if (urlRegex.test(urlValue) == true) {
    urlAlert.classList.add("d-none");
  } else {
    urlAlert.classList.remove("d-none");
  }
}

function visitBookmark(url) {
  window.open(url, "_blank");
}