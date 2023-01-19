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
        containerNode.innerHTML = `<div class="mt-5">
            
            
                <h1>${name}</h1>
                <h4>Brand: ${brand}</h4>
                <p>${description}</p>
                <p>Price: €${price}</p>
                <p>id: ${_id}</p>
                <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Product Image</button>
        
        </div>`

        document.querySelector("body").innerHTML += `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <img src="${imageUrl}" alt="Product Image">
                </div>
            </div>
        </div>
    </div>`


    } catch (error) {
        console.log(error)
    }
}