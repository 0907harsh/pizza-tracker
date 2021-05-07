/** @format */

const cartCounter1 = document.querySelector("#cartCounter1");
const cartCounter2 = document.querySelector("#cartCounter2");
let addToCart = document.querySelectorAll(".add-to-cart");
const flash_message = document.querySelector("#flash-message");

function updateCart(pizza) {
    fetch("/update-cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(pizza),
    })
        .then(async (response) => {
            const res = await response.json();
            console.log(response);
            cartCounter1.innerText = res.totalQty;
            cartCounter2.innerText = res.totalQty;
            flash_message.innerText = res.messages.message;
            flash_message.style.display = "block";
            setTimeout(() => {
                flash_message.style.display = "none";
            }, 3000);
            // response.json().then((data)=>{
            //     formatSearchResults(data)
            // })
        })
        .catch((error) => {
            console.log("Error : ", error);
            flash_message.classList = "uk-alert-danger";
            flash_message.innerText = "Internal Server Error";
            flash_message.style.display = "block";
            setTimeout(() => {
                flash_message.style.display = "none";
            }, 3000);
            // loationpara.textContent="Unable to access recipe services right Now. Please try again later."
        });
}

addToCart.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        //update cart
        let pizza = JSON.parse(btn.getAttribute("data-pizza_current"));
        // console.log(pizza)
        updateCart(pizza);
    });
});
