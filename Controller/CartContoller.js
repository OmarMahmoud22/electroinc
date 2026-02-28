const Cart = require('../models/cart');
const User = require('../models/User');
const Product = require('../models/Product');

const add_cart = async (req, res) => {
    try {
        const { productid, userid, quantity } = req.body;

        if (!productid || !userid || !quantity) 
            return res.status(400).json({ msg: "must add all data" });
        
        const user = await User.findById(userid);
        if (!user) 
            return res.status(404).json({ msg: "user not found" });
        

        const product = await Product.findById(productid);
        if (!product) {
            return res.status(404).json({ msg: "product not found" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ msg: "not enough stock" });
        }
        
 let cart = await Cart.findOne({user : userId});
        if(!cart) {
            cart = await Cart.create({
                user : userId,
                items : []
            });
        }

        // add product or update quantity
        const itemsIndex = Cart.items.findIndex(item => {
            return item.Product.equals(productId);
        });

        if(itemsIndex > -1) {
            Cart.items[itemsIndex].quantity += quantity;
        } else {
            Cart.items.push({Product : productId, quantity : quantity});
        }

        await cart.save();
        productId.stock -= quantity ;
        return res.status(201).json({message : 'Product added to cart', data : cart});

    } catch(error) {
        return res.status(500).json({message : error.message});
    }
};

  
// const get_cart = async(req,res) =>{
//     const
// }

module.exports={
    add_cart
}