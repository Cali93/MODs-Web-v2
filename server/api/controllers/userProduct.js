const express = require("express");
const router = require('express-promise-router')();
const mongoose = require("mongoose");

const User = require("../models/user");
const Project = require("../models/project");
const Product = require("../models/product");

exports.get_user_products = async (req, res, next) => {
  const id = req.params.userId;
  await User.findById(id)
    .select('_id name username email projects products')
    .populate('products', '_id name description quantity productImage')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          user: doc,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/user/' + id
          }
        });
      } else {
        res
          .status(404)
          .json({
            message: "No valid entry found for provided ID"
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.new_user_product = async (req, res, next) => {
  // Get user
  const id = req.params.userId;
  // Create a newProduct
  const newProduct = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    quantity: req.body.quantity,
    description: req.body.description,
    productImage: req.body.productImage,
    project: req.body.project,
    user: id
  });
  // console.log('new Product', newProduct);
  // Assign user as a new Product owner
  const user = await User.findById(id);
  newProduct.user = user
  // Save the Product
  await newProduct.save()
  // Add Product to the user's owning array products
  await user.products.push(newProduct._id);
  // Save the user
  await user.save()
  res.status(201).json(newProduct);

}

exports.delete_user_product = (req, res, next) => {
  res.json({
    message: 'User Project deleted'
  })
}
