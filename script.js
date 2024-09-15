const url = "https://fakestoreapi.com/products";
const cart = [];
const barang = [];

const divProduk = document.getElementsByClassName("div-produk");
const ambilData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  barang.push(data);

  data.forEach((item) => {
    divProduk[0].innerHTML += `
      <div class="col-md-4 ">  
        <div class="card" >
          <img src="${item.image}" class="card-img-top" alt="..." width="500">
          <div class="card-body">
            <h5 class="title">${item.title}</h5>
            <h5 class="category">${item.category}</h5>
            <p class="description">${item.description}</p>
            <button class="btn btn-primary">Tambah ke keranjang</button>
          </div>
        </div>
      </div>
    `;
  });

  let totalKeranjang = document.getElementsByClassName("cart_count")[0];
  const btnAddCart = document.getElementsByTagName("button");

  Array.from(btnAddCart).forEach((tombol) => {
    tombol.addEventListener("click", function () {
      let title = tombol.closest("div").querySelector(".title").innerText;
      let category = tombol.closest("div").querySelector(".category").innerText;
      let description = tombol
        .closest("div")
        .querySelector(".description").innerText;

      cart.push({ title: title, category: category, description: description });
      totalKeranjang.innerText = cart.length;
    });
  });
};
ambilData();

// Event listener untuk tombol "Tutup"
const modalKeranjang = document.getElementsByClassName("modal")[0];
const btnTutup = document.getElementsByClassName("btn-tutup")[0];
const btnTampilKeranjang =
  document.getElementsByClassName("tampil-keranjang")[0];
const keranjangAnda = document.getElementsByClassName("keranjang-anda")[0];

btnTutup.addEventListener("click", () => {
  modalKeranjang.classList.add("hidden");
});

btnTampilKeranjang.addEventListener("click", () => {
  modalKeranjang.classList.remove("hidden");
  keranjangAnda.innerHTML = "";
  cart.forEach((item, index) => {
    keranjangAnda.innerHTML += `
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <a href="#" class="btn btn-danger hapus-item">Hapus</a>
          </div>
        </div>
      </div>
    `;
  });

  const btnHapusItem = document.getElementsByClassName("hapus-item");
  Array.from(btnHapusItem).forEach((btn, index) => {
    btn.addEventListener("click", () => {
      cart.splice(index, 1); // Hapus item dari keranjang
      const totalKeranjang = document.getElementsByClassName("cart_count")[0];
      totalKeranjang.innerText = cart.length; // Update total keranjang
      btn.parentElement.remove(); // Hapus elemen dari tampilan
    });
  });
});

const searchBar = document.querySelector(".searchbar");
searchBar.addEventListener("keyup", (e) => {
  let namaBarang = e.target.value.toLowerCase();
  const hasilcari = barang[0].filter((item) => {
    return item.title.toLowerCase().includes(namaBarang);
  });
  const divProduk = document.getElementsByClassName("div-produk");
  divProduk[0].innerHTML = "";
  hasilcari.forEach((item) => {
    divProduk[0].innerHTML += `
      <div class="col-md-4 ">  
        <div class="card" >
          <img src="${item.image}" class="card-img-top" alt="..." width="500">
          <div class="card-body">
            <h5 class="title">${item.title}</h5>
            <h5 class="category">${item.category}</h5>
            <p class="description">${item.description}</p>
            <button class="btn btn-primary">Tambah ke keranjang</button>
          </div>
        </div>
      </div>
    `;
  });

  // Event listener untuk tombol "Tambah ke keranjang" setelah pencarian
  const btnAddCart = document.getElementsByTagName("button");
  Array.from(btnAddCart).forEach((tombol) => {
    tombol.addEventListener("click", function () {
      let title = tombol.closest("div").querySelector(".title").innerText;
      let category = tombol.closest("div").querySelector(".category").innerText;
      let description = tombol
        .closest("div")
        .querySelector(".description").innerText;

      cart.push({ title: title, category: category, description: description });
      const totalKeranjang = document.getElementsByClassName("cart_count")[0];
      totalKeranjang.innerText = cart.length;
    });
  });
});