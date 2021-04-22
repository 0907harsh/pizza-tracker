const oorderTableBody = document.querySelector('#orderTableBody')
let orders=[]
let markup

fetch('/admin/orders',{
    method: 'GET',
    headers: {
        "X-Requested-With": "XMLHttpRequest"
    }
}).then(async (res)=>{
    orders=await res.json()
    markup = generateMarkup(orders)
    oorderTableBody.innerHTML = markup
}).catch((err)=>{
    console.log(err)
})

function renderItems(items){
    let parsedItems = Object.values(items)
    return parsedItems.map((menuItem)=>{
        return `<p>${ menuItem.item.name } - ${menuItem.qty} pcs </p>`
    }).join('')
}

function generateMarkup(){
    var count=0;
    return orders.map(order=>{
        count = count+1
        return `
            <tr>
                <td>
                    <button class="uk-button uk-button-default" type="button" uk-toggle="target: #toggle-animation-multiple${count}; animation:  uk-animation-slide-left, uk-animation-slide-bottom">Order${count} </button>
                    <ul id="toggle-animation-multiple${count}" class="uk-list uk-list-bullet" hidden>
                        ${ renderItems(order.items) }
                    </ul>
                </td>
                <td>${order.customerId.name}</td>
                <td>${order.address}</td>
                <td><form action="/admin/order/status" method="POST" >
                    <input type="hidden" name="orderId" value="${order._id}">
                    <select name="status" onchange="this.form.submit()" class="uk-select">
                        <option value="Order_Accepted" ${order.status === 'Order_Accepted' ? 'selected="true"' : '' }>Order Placed</option>
                        <option value="Confirmed" ${order.status === 'Confirmed' ? 'selected="true"' : '' }>Order Confirmed</option>
                        <option value="Prepared" ${order.status === 'Prepared' ? 'selected="true"' : '' }>Order Prepared</option>
                        <option value="Out_For_Delivery" ${order.status === 'Out_For_Delivery' ? 'selected="true"' : '' }>Out for delivery</option>
                        <option value="Completed" ${order.status === 'Completed' ? 'selected="true"' : '' }>Completed</option>
                    </select>

                </form>
                </td>
                <td>${order.createdAt}</td>
            </tr>`
            
    }).join('')
    
    
}