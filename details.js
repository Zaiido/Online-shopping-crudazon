let url = "https://striveschool-api.herokuapp.com/api/product"
const params = new URLSearchParams(location.search);
const id = params.get("id");

let options = {
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2RlZmU3MzczODAwMTUzNzQzOWEiLCJpYXQiOjE2NzQxMzI5NzYsImV4cCI6MTY3NTM0MjU3Nn0.Cj7au6cWrGlbwHOg8ITb0psSHPW6cdDE58ySVLXQL5E"
    }
}

window.onload = async () => {
    try {
        let response = await fetch(url + "/" + id, options);
        const { _id, name, description, brand, price, imageUrl } = await response.json()
        let containerNode = document.querySelector("body>.container");
        containerNode.innerHTML = `<div class="d-flex mt-5">
        <div class="mr-5">
            <img src="${imageUrl}"
                alt="Product">
        </div>
        <div>
            <h1>Product: ${name}</h1>
            <h2>Brand: ${brand}</h2>
            <p>${description}</p>
            <p>Price: €${price}</p>
            <p>id: ${_id}</p>
        </div>
    </div>`
    } catch (error) {
        console.log(error)
    }
}