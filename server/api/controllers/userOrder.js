const express = require("express");
const router = require('express-promise-router')();
const mongoose = require("mongoose");

const User = require("../models/user");
const Project = require("../models/project");
const Product = require("../models/product");
const Order = require("../models/order");

exports.get_user_orders = async (req, res, next) => {
  const id = req.params.userId;
  await User.findById(id)
    .select('_id orders')
    .populate('orders', '_id product')
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

exports.new_user_order = async (req, res, next) => {
  // Get user
  const id = req.params.userId;
  // Create a newProduct
  const newOrder = new Order({
    _id: new mongoose.Types.ObjectId(),
    product: req.body.product,
    project: req.body.product.project,
    user: id
  });
  // console.log('new Product', newOrder);
  // Assign user as a new Order owner
  const user = await User.findById(id);
  newOrder.user = user
  // Save the Order
  await newOrder.save();
  // Add Order to the user's owning array orders
  await user.orders.push(newOrder._id);
  // Save the user
  await user.save();
  res.status(201).json(newOrder);

}

exports.delete_user_order = (req, res, next) => {
  res.json({
    message: 'User Project deleted'
  })
}
