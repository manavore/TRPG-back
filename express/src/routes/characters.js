/**
 * @fileoverview Routes of characters
 * @author Póvoa Tiago
 */

const express = require("express");
const router = express.Router();

const Character = require("../models/character");

router.get("/", (req, res) => {
  Character.find()
    .then(c => res.json(c))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.get("/:characterid", (req, res) => {
  const id = req.params.characterid;
  const withDetails =
    req.query.withDetails === "true" || req.query.withDetails === "1"
      ? "+details " : "";
  const withInventory =
    req.query.withInventory === "true" || req.query.withInventory === "1"
      ? "+inventory" : "";

  Character.findById({ _id: id })
    .select(`${withDetails} ${withInventory}`)
    .exec()
    .then(c => res.json(c))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.post("/", (req, res) => {
  const { name, details } = req.body;

  const newCharacter = new Character({ name, details });

  newCharacter
    .save()
    .then(savedCharacter => res.status(201).json({ savedCharacter }))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.patch("/:characterid", (req, res) => {
  const id = req.params.characterid;
  // const newName = req.body.name; // todo fix this

  Character.findById({ _id: id })
  .then(c => {
    c.set(req.body);

    c.save()
    .then(savedC => res.status(202).json( savedC ))
    .catch(err => res.status(400).json(`Error: ${err}`));
  })
  .catch(err => res.status(404).json(`Error: ${err}`));
});

router.delete("/:characterid", (req, res) => {
  const id = req.params.characterid;

  Character.deleteOne({ _id: id })
    .then(c => res.status(200).json(c))
    .catch(err => res.status(400).json(`Error: ${err}`)); // todo maybe the error is too explicit, should be 404 ?
});

module.exports = router;
