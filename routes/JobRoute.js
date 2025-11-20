const express = require("express");
const router = express.Router();
const jobController = require("../controllers/JobController");

router.post("/", jobController.postJob);
router.get("/", jobController.getJobs);
router.get("/:id", jobController.getJobById);
router.delete("/:id", jobController.deleteJob);

module.exports = router;
