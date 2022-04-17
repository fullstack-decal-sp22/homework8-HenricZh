const express = require("express");
const router = express.Router();
const auth = require("./../middleware/auth");
const User = require("../model/User");

router.get('/list', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        console.log(user)
        res.json(user.shoppinglist);
    } catch(e) {
        res.send({message: "Error in Fetching User"});
    }
});

router.post('/add', auth, async(req, res) => {
    try {        
        const item = req.body.item;
        const user = await User.findById(req.user.id);
        User.findOneAndUpdate({user},{$push: {shoppinglist: item}}, {new: true}, function(err, User) {
            if (err) {
                console.log(err);
                res.json({msg: "cannot add to shop list"})
            } else {
                res.json({
                    status: "added successful",
                    shoppinglist: User.shoppinglist
                })
            }
        })
    } catch(e) {
        res.send({message: "cannot add to shop list"});
    }
});

router.delete('/delete', auth, async(req,res) => {
    try {
        const item = req.body.item;
        const user = await User.findById(req.user.id);
        User.findOneAndUpdate({user},{$pull: {shoppinglist: item}}, {new: true}, function(err, User) {
            if (err) {
                console.log(err);
                res.json({msg: "cannot delete from shop list"})
            } else {
                res.json({
                    status: "deleted successful",
                    shoppinglist: User.shoppinglist
                })
            }
        })
    } catch(e) {
        res.send({message: "cannot delete from shot list"});
    }
})

module.exports = router;