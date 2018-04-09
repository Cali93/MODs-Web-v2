const express = require("express");
// const router = express.Router();
const router = require('express-promise-router')();
const checkAuth = require('../middleware/check-auth');
const UserController = require("../controllers/user");
const UserProjectController = require("../controllers/userProject");
const UserProductController = require("../controllers/userProduct");
const UserOrderController = require("../controllers/userOrder");
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Profile
router.get('/profile', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  res.json({
    user: req.user
  });
});

router.post("/signup", UserController.user_signup);
router.post("/login", UserController.user_login);

router.get("/", UserController.get_users);

router.route("/:userId")
    .get(UserController.get_user)
    .delete(checkAuth, UserController.delete_user);


/* USER PROJECTS*/
router.route('/:userId/projects')
    .get(UserProjectController.get_user_projects)
    .post(UserProjectController.new_user_project)
    .delete(UserProjectController.delete_user_project)

/* USER PRODUCTS*/
router.route('/:userId/products')
    .get(UserProductController.get_user_products)
    .post(UserProductController.new_user_product)
    .delete(UserProductController.delete_user_product)

/* USER Orders*/
router.route('/:userId/orders')
    .get(UserOrderController.get_user_orders)
    .post(UserOrderController.new_user_order)
    .delete(UserOrderController.delete_user_order)
  
module.exports = router;
