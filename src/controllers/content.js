const pool = require("../../db");
const queries = require("../queries/content");

// Get content by ID
const getContent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(queries.GET_CONTENT, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create new content
const createContent = async (req, res) => {
  try {
    const { whoWeAre, whatWeDo, projectsCount, beneficiariesCount, volunteersCount, vision, mission } = req.body;
    
    const newContent = await pool.query(queries.CREATE_CONTENT, [
      whoWeAre, whatWeDo, projectsCount, beneficiariesCount, volunteersCount, vision, mission
    ]);

    res.status(201).json({ message: "Content created", data: newContent.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create content" });
  }
};

// Update content by ID
const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { whoWeAre, whatWeDo, projectsCount, beneficiariesCount, volunteersCount, vision, mission } = req.body;
    
    const updatedContent = await pool.query(queries.UPDATE_CONTENT, [
      whoWeAre, whatWeDo, projectsCount, beneficiariesCount, volunteersCount, vision, mission, id
    ]);

    if (updatedContent.rows.length === 0) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.status(200).json({ message: "Content updated", data: updatedContent.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update content" });
  }
};

module.exports = {
  getContent,
  createContent,
  updateContent,
};
