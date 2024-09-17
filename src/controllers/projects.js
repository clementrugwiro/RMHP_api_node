const projectModel = require("../models/projects");
const cloudinary = require("../../cloudinary");

// Create a new project
const createProject = async (req, res) => {
  try {
    const { name, location, description, dateStarted } = req.body;
    const images = req.files; // Files uploaded via multer

    // Upload images to Cloudinary
    const imageUrls = await Promise.all(
      images.map(
        (image) =>
          new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream({ folder: "projects" }, (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
              })
              .end(image.buffer);
          })
      )
    );

    const project = await projectModel.createProject({
      name,
      location,
      description,
      dateStarted,
      imageUrls,
    });

    res.status(201).json({ message: "Project created", data: project.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create project" });
  }
};

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const result = await projectModel.getAllProjects();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get project by ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await projectModel.getProjectById(id);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, description, dateStarted } = req.body;
    const images = req.files;

    let imageUrls = [];
    if (images) {
      imageUrls = await Promise.all(
        images.map(
          (image) =>
            new Promise((resolve, reject) => {
              cloudinary.uploader
                .upload_stream({ folder: "projects" }, (error, result) => {
                  if (error) return reject(error);
                  resolve(result.secure_url);
                })
                .end(image.buffer);
            })
        )
      );
    }

    const project = await projectModel.updateProject(id, {
      name,
      location,
      description,
      dateStarted,
      imageUrls,
    });

    if (project.rowCount === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project updated", data: project.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update project" });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectModel.deleteProject(id);

    if (project.rowCount === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete project" });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
