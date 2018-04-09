const mongoose = require("mongoose");

const User = require("../models/user");

const Project = require ("../models/project");

const passport = require("passport");
// const Product = require  ("../models/product");

exports.get_all_projects = (req, res, next) => {
  Project.find()
    .select("_id user meshes")
    .populate('user', '_id')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        projects: docs.map(doc => {
          return {
            _id: doc._id,
            user: doc.user,
            meshes: doc.meshes,
            request: {
              type: "GET",
              url: "http://localhost:3000/projects/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

exports.get_project = (req, res, next) => {
  Project.findById(req.params.projectId)
    .select('user meshes')
    .exec()
    .then(project => {
      if (!project) {
        return res.status(404).json({
          message: "Project not found"
        });
      }
      res.status(200).json({
        project: project,
        request: {
          type: "GET",
          url: "http://localhost:3000/projects/"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

exports.update_project = (req, res, next) => {
  
  const id = req.params.projectId;

  Project.findOneAndUpdate({ _id: id }, req.body, { new:false })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Project updated',
          request: {
              type: 'GET',
              url: 'http://localhost:3000/projects/' + id
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.delete_project = (req, res, next) => {
  Project.remove({ _id: req.params.projectId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Project deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/projects/",
          body: { projectId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}