const cartCounter = document.querySelector('#cartCounter')
let addToCart = document.querySelectorAll('.add-to-cart')

function updateCart(pizza){
    fetch('/update-cart',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body:JSON.stringify(pizza)
    }).then(async (response)=>{
       const res = await response.json()
        // console.log(res.totalQty)
       cartCounter.innerText = res.totalQty
        // response.json().then((data)=>{
        //     formatSearchResults(data)
        // })
     }).catch((error)=>{
        console.log('Error : ',error)
        // loationpara.textContent="Unable to access recipe services right Now. Please try again later."
     })
}

addToCart.forEach(btn => {
   btn.addEventListener('click',(e)=>{
      //update cart
      let pizza = JSON.parse(btn.getAttribute('data-pizza_current'))
      updateCart(pizza)
   }) 
})