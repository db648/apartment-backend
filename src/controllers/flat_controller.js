const router = require("express").Router();
const Flat = require("../models/flat_model");
const verify = require("../../verifyToken");

router.post("/", verify, async (req, res) => {
    try {
      const newFlat = await Flat.create(req.body);
      res.status(201).send(newFlat);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get("/find/:id", verify, async (req, res) => {
    try {
      const flat = await Flat.findById(req.params.id);
      res.status(200).json(flat);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.put("/:id", verify, async (req, res) => {
    try {
      const updatedFlat = await Flat.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedFlat);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get("/", verify, async (req, res) => {
    try {
      const flats = await Flat.find()
        .populate({ path: "residents" })
        .lean()
        .exec();
      res.status(201).send(flats);
    } catch (err) {
      res.status(500).send(err);
    }
});
  
module.exports = router;