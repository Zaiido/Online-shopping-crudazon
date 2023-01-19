let url = "https://striveschool-api.herokuapp.com/api/product"
const params = new URLSearchParams(location.search);
const id = params.get("id")


const addNewProduct = async (addProductEvent) => {
    try {
        addProductEvent.preventDefault();

        const newProduct = {
            name: document.querySelector("#product-name").value,
            description: document.querySelector("#product-description").value,
            brand: document.querySelector("#product-brand").value,
            imageUrl: document.querySelector("#product-image").value,
            price: document.querySelector("#product-price").value
        }


        let options = {
            method: "POST",
            headers: new Headers({
                "Content-type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2RlZmU3MzczODAwMTUzNzQzOWEiLCJpYXQiOjE2NzQxMzI5NzYsImV4cCI6MTY3NTM0MjU3Nn0.Cj7au6cWrGlbwHOg8ITb0psSHPW6cdDE58ySVLXQL5E"
            }),
            body: JSON.stringify(newProduct)
        }

        let response = await fetch(url, options)
        if (response.ok) {
            handleSuccess("Product added!")
            await displayProductsList()
        }

        else {
            throw response.status + " " + response.statusText
        }

    } catch (error) {
        handleError(error)
    }
}


const displayProductsList = async () => {
    try {
        let tbodyNode = document.querySelector("tbody");
        let options = {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2RlZmU3MzczODAwMTUzNzQzOWEiLCJpYXQiOjE2NzQxMzI5NzYsImV4cCI6MTY3NTM0MjU3Nn0.Cj7au6cWrGlbwHOg8ITb0psSHPW6cdDE58ySVLXQL5E"
            }
        }
        tbodyNode.innerHTML = "";
        let response = await fetch(url, options);
        let products = await response.json();
        products.forEach(({ _id, name, brand, price }) => {
            tbodyNode.innerHTML += `<tr>
            <th scope="row">${_id}</th>
            <td>${name}</td>
            <td>${brand}</td>
            <td>${price}</td>
            <td>
                <a onclick="deleteProduct('${_id}')" class="btn btn-outline-danger">Delete</a>
                <a href="back-office.html?id=${_id}" class="btn btn-success">Edit</a>
            </td>
        </tr>`
        });

    } catch (error) {
        handleError(error)
    }

}

const deleteProduct = async (idToDelete) => {
    try {
        let response = await fetch(url + "/" + idToDelete, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2RlZmU3MzczODAwMTUzNzQzOWEiLCJpYXQiOjE2NzQxMzI5NzYsImV4cCI6MTY3NTM0MjU3Nn0.Cj7au6cWrGlbwHOg8ITb0psSHPW6cdDE58ySVLXQL5E"
            }
        })
        if (response.ok) {
            await displayProductsList()
            handleSuccess("Product deleted.")
        }

        else {
            throw response.status + " " + response.statusText
        }
    } catch (error) {
        handleError(error)
    }
}

const editProduct = async (editEvent) => {
    try {
        editEvent.preventDefault();

        const newProduct = {
            name: document.querySelector("#product-name").value,
            description: document.querySelector("#product-description").value,
            brand: document.querySelector("#product-brand").value,
            imageUrl: document.querySelector("#product-image").value,
            price: document.querySelector("#product-price").value
        }

        let options = {
            method: "PUT",
            headers: new Headers({
                "Content-type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2RlZmU3MzczODAwMTUzNzQzOWEiLCJpYXQiOjE2NzQxMzI5NzYsImV4cCI6MTY3NTM0MjU3Nn0.Cj7au6cWrGlbwHOg8ITb0psSHPW6cdDE58ySVLXQL5E"
            }),
            body: JSON.stringify(newProduct)
        }

        let response = await fetch(url + "/" + id, options);
        let productsList = document.querySelector("table");
        productsList.style.visibility = "visible";
        if (response.ok) {
            await displayProductsList()
            handleSuccess("Product information updated.")
        }
        else {
            throw response.status + " " + response.statusText
        }

    } catch (error) {
        handleError(error)
    }
}


window.onload = async () => {
    try {

        await displayProductsList()


        if (id !== null) {
            let addButtonNode = document.querySelector(".btn-primary");
            addButtonNode.remove();

            let productsList = document.querySelector("table");
            productsList.style.visibility = "hidden"

            let response = await fetch(url + "/" + id, {
                headers: new Headers({
                    "Content-type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5M2RlZmU3MzczODAwMTUzNzQzOWEiLCJpYXQiOjE2NzQxMzI5NzYsImV4cCI6MTY3NTM0MjU3Nn0.Cj7au6cWrGlbwHOg8ITb0psSHPW6cdDE58ySVLXQL5E"
                })
            })

            if (response.ok) {
                let { name, description, brand, imageUrl, price } = await response.json();
                document.querySelector("#product-name").value = name;
                document.querySelector("#product-description").value = description;
                document.querySelector("#product-brand").value = brand;
                document.querySelector("#product-image").value = imageUrl;
                document.querySelector("#product-price").value = price;
            }
            else {
                throw response.status + " " + response.statusText
            }

        } else {
            let saveChangesButtonNode = document.querySelector("form .btn-success");
            saveChangesButtonNode.remove();
        }

    } catch (error) {
        handleError(error)
    }

}



const handleError = (error) => {
    let alert = document.querySelector(".alert-danger")
    alert.querySelector("span").innerText = error
    alert.classList.replace("d-none", "d-block")
}

const handleSuccess = (text) => {
    let alert = document.querySelector(".alert-success")
    alert.querySelector("span").innerText = text
    alert.classList.replace("d-none", "d-block")
}