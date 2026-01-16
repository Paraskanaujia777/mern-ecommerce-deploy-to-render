const express = require('express');

const router = express.Router();

const {addAddress ,
    editAddress ,
    fetchAllAddress ,
    deleteAddress ,
} = require('../../controllers/shop/address-controller');

router.get('/get/:userId' , fetchAllAddress);
router.post('/add' , addAddress);
router.put('/update/:userId/:addressId' , editAddress);
router.delete('/delete/:userId/:addressId' , deleteAddress);

module.exports = router;






