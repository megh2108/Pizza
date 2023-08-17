const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Authenticate = require("../middleware/Authenticate");


require('../db/conn');
const User = require('../model/userSchema');
const Userss = require('../model/userSchemass');
const Admin = require('../model/adminSchema');
const PizzaMenuItem = require('../model/pizzaMenuItemSchema');
// const Pizza = require('../model/pizzaSchema');
// const User1 = require('../model/user1Schema');
// const MenuItem = require('../model/menuItemSchema');
const Ingredient = require('../model/ingredientSchema');
const Offer = require('../model/offerSchema');
const Order = require('../model/orderSchema');
const OrderDetail = require('../model/orderDetailSchema');
const Cart = require('../model/cartSchema');
const Payment = require('../model/paymentSchema');
const Shop = require('../model/shopSchema');
const Toping = require('../model/topingSchema');

// const Topping = require('../model/toppingSchema');


router.get('/',(req,res) =>{
    res.send(`Hello world from server`);
})

router.post('/signin', async (req, res) => {
    // console.log(req.body);
    // res.json({message:req.body})

    // for testing
    // console.log(req.body.name);
    // console.log(req.body.email);

    const { name, email, phone, password, cpassword } = req.body;

    console.log(req.body);

    //  for validation purpose - if empty feild then error throw
    if (!name || !email || !phone || !password || !cpassword ) {

        return res.status(422).json({ error: "please filled properly feild ." });

    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "user is already exist" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "password are not same" });

        } else {


            const user = new User({ name, email, phone, password, cpassword});

            //if user is new then we save attribute , but before save we have to encrypt password feild using bcrypt.js
            // presave method

            await user.save();

            res.status(201).json({ message: "user registerd successfully" });
        }


    } catch (err) {
        console.log(err);
    }



})

router.post('/sign', async (req, res) => {
    const { name, email, phone, password, cpassword, type, secretKey, shopID } = req.body;

    // Validate input fields
    if (!name || !email || !phone || !password || !cpassword || !type) {
        return res.status(422).json({ error: "Please fill in all required fields." });
    }

    try {
        // Check if user already exists
        const userExist = await Userss.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "User already exists." });
        }

        // Check if password and confirm password match
        else if (password !== cpassword) {
            return res.status(422).json({ error: "Passwords do not match." });
        }

        if (type === 'admin') {
            if (secretKey !== 'admin') {
                return res.status(403).json({ error: "Invalid secret key for admin registration." });
            }
        }

        // Create a new user
        const user = new Userss({ name, email, phone, password, cpassword, type, secretKey, shopID });

        // Save the user to the database
        await user.save();

        res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});






router.post('/login', async (req, res) => {

    try {
        // console.log(req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please filled the data." });
        }


        const userLogin = await Userss.findOne({ email: email });
        console.log(userLogin);

        
        if (userLogin != null) {


            const isMatch = await bcrypt.compare(password,userLogin.password);
            
            if(!isMatch){
                
                res.status(400).json({ error: "Invalid Credentials." });
            }else{
                
                const token = await userLogin.generateAuthToken();
                console.log(token)
        
                // for cookies
                // this cookie will save on your browser which you are using for login 
                // name of cookies is left side and right side is actual token
                // pass third parameter fr=or the expire token
                res.cookie("jwtoken",token,{ 
                    expires: new Date(Date.now() + 25892000000),    
                    httpOnly: true
                });

                if (userLogin.type === 'admin') {
                    return res.status(200).json({ message: "Admin login successfully" });
                } 
                else {
                    return res.status(201).json({ message: "User login successfully" });
                }
             
                // res.status(201).json({ message: "user login successfully" });
            }

         
        }else {

            res.status(400).json({ error: "Invalid Credentials...   " });

        }

    } catch (err) {

        console.log(err);

    }
})



router.post('/addtocart', Authenticate, async (req, res) => {
    try {
        const { itemName, size, quantity } = req.body;
        const userId = req.rootUser._id;

        // Find the menu item by itemName
        const menuItem = await PizzaMenuItem.findOne({ itemName: itemName });

        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        // Get the selected size details
        const selectedSize = menuItem.sizes[size];

        if (!selectedSize) {
            return res.status(400).json({ error: 'Invalid size selected' });
        }

        const totalPrice = selectedSize.price * quantity;

        // const totalPrice = selectedSize.price * quantity;

        const cart = await Cart.findOne({ userID: userId, shopID: menuItem.shopID });

        if (!cart) {
            const newCart = new Cart({
                userID: userId,
                shopID: menuItem.shopID,
                items: [
                    {
                        menuItem: menuItem._id,
                        itemName: menuItem.itemName,
                        size: size,
                        quantity: quantity,
                        price: selectedSize.price,
                        totalPrice: totalPrice
                    }
                ]
            });
            await newCart.save();
        } else {
            // Check if the same menu item with same size is already in the cart
            const existingItem = cart.items.find(
                item => item.menuItem.toString() === menuItem._id.toString() && item.size === size
            );

            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.totalPrice += totalPrice;
            } else {
                cart.items.push({
                    menuItem: menuItem._id,
                    itemName: menuItem.itemName,
                    size: size,
                    quantity: quantity,
                    price: selectedSize.price,
                    totalPrice: totalPrice
                });
            }
            await cart.save();
        }

        res.status(201).json({ message: 'Menu item added to cart successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});




router.post('/order', Authenticate, async (req, res) => {
    try {
        const userId = req.rootUser._id;

        // Find the user's cart
        const cart = await Cart.findOne({ userID: userId });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        const itemsInCart = cart.items;

        if (itemsInCart.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        const totalAmount = itemsInCart.reduce((total, item) => total + item.totalPrice, 0);

        // Create an order
        const order = new Order({
            userID: userId,
            shopID: cart.shopID,
            orderDate: new Date(),
            totalAmount: totalAmount,
            orderStatus: 'Pending', // You can set the initial order status here
            paymentStatus: 'Pending' // You can set the initial payment status here
        });

        // Save the order
        await order.save();

        // Create order details
        const orderDetails = new OrderDetail({
            orderID: order._id,
            items: itemsInCart.map(item => ({
                menuItem: item.menuItem,
                itemName: item.itemName,
                size: item.size,
                quantity: item.quantity
            }))
        });

        // Save order details
        await orderDetails.save();

        // Remove items from the cart
        cart.items = [];
        await cart.save();

        res.status(201).json({ message: 'Order placed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/pizza',async (req, res) => {
    // Use the Pizza model to find all documents in the collection
    try {
        // Use the Pizza model to find all documents in the collection
        const pizzas = await Pizza.find({});
        // Return the data as JSON
        res.json(pizzas);
      } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal server error' });
      }
  })


  router.get('/carts', Authenticate, (req, res) => {
    console.log(`Hello my About`);
    res.send(req.rootUser);
  });
//   router.get('/carts', Authenticate, (req, res) => {
//     console.log(`Hello my About`);
//     res.send(req.rootUser);
//   });

module.exports = router;