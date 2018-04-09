const express = require("express");
const router = require('express-promise-router')();
const mongoose = require("mongoose");

const User = require("../models/user");
const Project = require("../models/project");

exports.get_user_projects = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select('_id name username email projects products')
    .populate('projects', 'meshes _id')
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

exports.new_user_project = async (req, res, next) => {

  console.log('Json de meshes: ')
  console.log(req.body.meshes);
  // Get user
  const id = req.params.userId;
  // Create a newProject
  const newProject = new Project({
    _id: new mongoose.Types.ObjectId(),
    meshes:req.body.meshes,
    user: id
  });
  // console.log('new Project', newProject);
  // Assign user as a new project owner
  const user = await User.findById(id);
  newProject.user = user
  // Save the project
  newProject.save()
  // Add project to the user's owning array projects
  await user.projects.push(newProject._id);
  // Save the user
  user.save()
  res.status(201).json(newProject);

}

exports.delete_user_project = (req, res, next) => {
  res.json({
    message: 'User Project deleted'
  })
}
