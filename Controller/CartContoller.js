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

        // findindex =>array  do some think if true get me index  if not get me -1
        const itemsIndex = cart.items.findIndex(item => {
            //the condetion is => if item.produt === productid in cart
            return item.Product.equals(productid);
        });

        if (itemsIndex > -1) {
            //cart.items[0].quantity += 3;
            cart.items[itemsIndex].quantity += quantity;
        } else {
            cart.items.push({ Product: productid, quantity: quantity });
        }

        await cart.save();

        product.stock -= quantity;
        await product.save();
        
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
