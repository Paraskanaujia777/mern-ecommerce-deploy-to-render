const express = require('express');

const {addToCart ,
    fetchCartItems ,
    updateCartItemQty ,
    deleteCartItem ,
} = require('../../controllers/shop/cart-controller');
const { authMidddleware } = require('../../controllers/auth/auth-controller');

const  router = express.Router();

router.post('/add' ,authMidddleware, addToCart);
router.get('/get/:userId' ,authMidddleware, fetchCartItems);
router.put('/update-cart' , updateCartItemQty);
router.delete('/:userId/:productId' ,authMidddleware, deleteCartItem);

module.exports = router ;
























