const router = require("express").Router();
const Resident = require("../models/resident_model");
const verify = require("../../verifyToken");

router.post("/", verify, async (req, res) => {
    try {
      const newResident = await Resident.create(req.body);
      res.status(201).send(newResident);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.put("/:id", verify, async (req, res) => {
    try {
      const updatedresident = await Resident.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedresident);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get("/find/:id", verify, async (req, res) => {
    try {
      const resident = await Resident.findById(req.params.id);
      res.status(200).json(resident);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get("/", verify, async (req, res) => {
    try {
      const residents = await Resident.find();
      res.status(201).send(residents);
    } catch (err) {
      res.status(500).send(err);
    }
});
  
module.exports = router;