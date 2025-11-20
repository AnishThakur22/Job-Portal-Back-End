const Job = require("../models/JobModel");

// POST: Create a new job
exports.postJob = async (req, res) => {
    console.log("POST /api/jobs hit", req.body);

    try {
        const { jobTitle, companyName, location, salary, description } = req.body;

        if (!jobTitle || !companyName || !location || !description || !salary ) {
            return res.status(400).json({ message: "All fields except salary are required" });
        }

        const job = await Job.create({
            jobTitle,
            companyName,
            location,
            salary,
            description
        });

        res.status(201).json({
            success: true,
            message: "Job created successfully",
            data: job
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to post job",
            error: error.message
        });
    }
};

// GET: Fetch all jobs
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            total: jobs.length,
            data: jobs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve jobs",
            error: error.message
        });
    }
};

// GET: Fetch a job by ID
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        res.status(200).json({
            success: true,
            data: job
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving job",
            error: error.message
        });
    }
};

// DELETE: Delete a job by ID
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Job deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete job",
            error: error.message
        });
    }
};
