/* import Cart from '../Models/cart.js'

async function addItemToCart(payload) {
    const newItem = await Cart.create(payload)
    return newItem
}


async function getCart(){
    const carts = await Cart.find().populate({
        path:"items.productId",
        select:"name price total"
    })

    return carts[0]
} */


