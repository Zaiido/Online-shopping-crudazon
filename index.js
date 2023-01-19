let url = "https://striveschool-api.herokuapp.com/api/product/"


let options = {
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2RlZmU3MzczODAwMTUzNzQzOWEiLCJpYXQiOjE2NzQxMzI5NzYsImV4cCI6MTY3NTM0MjU3Nn0.Cj7au6cWrGlbwHOg8ITb0psSHPW6cdDE58ySVLXQL5E"
    }
}
let rowNode = document.querySelector(".row")

const getProducts = async () => {
    rowNode.classList.add("d-flex", "justify-content-center")
    rowNode.innerHTML = `<div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>`
    try {
        let response = await fetch(url, options)
        let products = await response.json()
        renderProducts(products)
    } catch (error) {
        console.log(error)
    }
}

window.onload = async () => {
    await getProducts()
}

const renderProducts = (products) => {
    rowNode.innerHTML = "";
    rowNode.classList.remove("d-flex", "justify-content-center")
    products.forEach(({ name, description, brand, imageUrl, price, _id }) => {
        rowNode.innerHTML += `<div class="col-12 col-sm-6 col-md-4 col-lg-4">
    <div class="card rounded-0">
        <img src="${imageUrl}" class="card-img-top rounded-0" alt="Product">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2 text-muted"><span class="badge badge-pill badge-dark">${brand}</span></h6>
            <p class="card-text">${description}</p>
            <h6 class="card-subtitle mb-2 text-muted">€${price}</h6>
            <div class="d-flex justify-content-end">
                <a href="details.html?id=${_id}" class="btn btn-primary">Details</a>
            </div>
        </div>
    </div>
</div>`
    });
}