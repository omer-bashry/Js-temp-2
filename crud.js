// inputs filed
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let catogery = document.getElementById("catogery");
let submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let deleteAllDiv = document.getElementById("delete-all");
let search = document.getElementById("search");

//update valiables
let mood = "create";
let tmp;

//get total function
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "red";
  }
}

//create product
let newPro;
if (localStorage.product != null) {
  newPro = JSON.parse(localStorage.product);
} else {
  newPro = [];
}
submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    catogery: catogery.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    catogery.value != "" &&
    newProduct.count < 101
  ) {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          newPro.push(newProduct);
        }
      } else {
        newPro.push(newProduct);
      }
    } else {
      newPro[tmp] = newProduct;
      submit.innerHTML = "Create";
      count.style.display = "block";
      mood = "create";
    }
    clearData();
  }
  // save on local storge
  localStorage.setItem("product", JSON.stringify(newPro));
  total.style.backgroundColor = "red";
  readData();
};

// Clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  catogery.value = "";
}

// read data
function readData() {
  let table = "";
  for (let i = 0; i < newPro.length; i++) {
    table += `
            <tr>
              <td>${i + 1}</td>
              <td>${newPro[i].title}</td>
              <td>${newPro[i].price}</td>
              <td>${newPro[i].taxes}</td>
              <td>${newPro[i].ads}</td>
              <td>${newPro[i].discount}</td>
              <td>${newPro[i].total}</td>
              <td>${newPro[i].catogery}</td>
              <td><button id="update" onclick = "updateProduct(${i})">update</button></td>
              <td><button id="delete" onclick = "deleteProduct(${i})">delete</button></td>
              </tr>
              `;
  }
  tbody.innerHTML = table;

  // Create Delete All Bottun
  if (newPro.length != 0) {
    deleteAllDiv.innerHTML = `<button onclick ="deleteAllProducts()">Delete All (${newPro.length})</button>`;
  } else {
    deleteAllDiv.innerHTML = "";
  }
}
readData();

// delet product
function deleteProduct(i) {
  newPro.splice(i, 1);
  localStorage.product = JSON.stringify(newPro);
  readData();
}

// Delete All Products
function deleteAllProducts() {
  localStorage.clear();
  newPro.splice(0);
  readData();
}

// Update Product
function updateProduct(i) {
  title.value = newPro[i].title;
  price.value = newPro[i].price;
  taxes.value = newPro[i].taxes;
  ads.value = newPro[i].ads;
  discount.value = newPro[i].discount;
  catogery.value = newPro[i].catogery;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search
let searchMood = "title";
function getSearchMood(id) {
  if (id === "searcTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  readData();
}
function searchProduct(value) {
  let table = "";
  for (let i = 0; i < newPro.length; i++) {
    if (searchMood === "title") {
      if (newPro[i].title.includes(value.toLowerCase())) {
        table += `
            <tr>
              <td>${i + 1}</td>
              <td>${newPro[i].title}</td>
              <td>${newPro[i].price}</td>
              <td>${newPro[i].taxes}</td>
              <td>${newPro[i].ads}</td>
              <td>${newPro[i].discount}</td>
              <td>${newPro[i].total}</td>
              <td>${newPro[i].catogery}</td>
              <td><button id="update" onclick = "updateProduct(${i})">update</button></td>
              <td><button id="delete" onclick = "deleteProduct(${i})">delete</button></td>
              </tr>
              `;
      }
    } else {
      if (newPro[i].catogery.includes(value.toLowerCase())) {
        table += `
            <tr>
              <td>${i + 1}</td>
              <td>${newPro[i].title}</td>
              <td>${newPro[i].price}</td>
              <td>${newPro[i].taxes}</td>
              <td>${newPro[i].ads}</td>
              <td>${newPro[i].discount}</td>
              <td>${newPro[i].total}</td>
              <td>${newPro[i].catogery}</td>
              <td><button id="update" onclick = "updateProduct(${i})">update</button></td>
              <td><button id="delete" onclick = "deleteProduct(${i})">delete</button></td>
              </tr>
              `;
      }
    }
  }
  tbody.innerHTML = table;
}
