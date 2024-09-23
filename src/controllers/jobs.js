const jobModel = require("../models/jobs");

// Create a new job
const createJob = async (req, res) => {
  try {
    const job = await jobModel.createJob(req.body);
    res.status(201).json(job.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobModel.getAllJobs();
    res.status(200).json(jobs.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get job by ID
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await jobModel.getJobById(id);

    if (job.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a job
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJob = await jobModel.updateJob(id, req.body);

    if (updatedJob.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res
      .status(200)
      .json({ message: "Job updated successfully", data: updatedJob.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await jobModel.deleteJob(id);

    if (deletedJob.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res
      .status(200)
      .json({ message: "Job deleted successfully", job: deletedJob.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};
