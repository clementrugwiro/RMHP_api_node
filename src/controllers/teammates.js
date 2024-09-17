const pool = require("../../db");
const queries = require("../queries/teammates")
const cloudinary = require("../../cloudinary")

// Create a new teammate
const createTeamMate = async (req, res) => {
  try {
    const { name, profession, social_Media } = req.body;
    const image = req.file; // File uploaded via multer
    console.log(image)
    // Upload the image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "team" },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );

      // Pipe the buffer to Cloudinary's upload stream
      uploadStream.end(image.buffer);
    });

    const imageUrl = uploadResult.secure_url;

    // Insert the team member's data into the database
    const newTeamMate = await pool.query(queries.CREATE_TEAMMATE, [
      name,
      profession,
      social_Media,
      imageUrl,
    ]);

    res
      .status(201)
      .json({ message: "Team member created", data: newTeamMate.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create team member" });
  }
};

// Get all teammates
const getAllTeammates = async (req, res) => {
  try {
    const result = await pool.query(queries.GET_ALL_TEAMMATES);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get teammate by ID
const getTeammateById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(queries.GET_TEAMMATE_BY_ID, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Teammate not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTeamMate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, profession, social_Media } = req.body;
    const image = req.file; // File uploaded via multer

    let imageUrl = null;

    if (image) {
      // Upload the new image to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "team" },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );

        uploadStream.end(image.buffer);
      });

      imageUrl = uploadResult.secure_url;

      // Get the current teammate data to delete the old image
      const currentTeammate = await pool.query(queries.GET_TEAMMATE_BY_ID, [
        id,
      ]);

      if (currentTeammate.rows.length > 0) {
        const oldImageUrl = currentTeammate.rows[0].image_url;

        // Extract public ID from the old image URL to delete it
        const publicId = oldImageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }
    }

    // Update the teammate's data, only including fields that are provided
    const updateFields = [];
    const values = [];
    let query = "UPDATE teammates SET";

    if (name) {
      updateFields.push(`name = $${values.length + 1}`);
      values.push(name);
    }

    if (profession) {
      updateFields.push(`profession = $${values.length + 1}`);
      values.push(profession);
    }

    if (social_Media) {
      updateFields.push(`social_media = $${values.length + 1}`);
      values.push(social_Media);
    }

    if (imageUrl) {
      updateFields.push(`image_url = $${values.length + 1}`);
      values.push(imageUrl);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    // Construct the final query
    query += ` ${updateFields.join(", ")} WHERE id = $${
      values.length + 1
    } RETURNING *`;
    values.push(id);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Teammate not found" });
    }

    res
      .status(200)
      .json({ message: "Team member updated", data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update team member" });
  }
};



// Delete a teammate
const deleteTeammate = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(queries.DELETE_TEAMMATE, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Teammate not found" });
    }

    res.status(200).json({
      message: "Teammate deleted successfully",
      teammate: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createTeamMate,
  getAllTeammates,
  updateTeamMate,
  getTeammateById,
  deleteTeammate,
};
