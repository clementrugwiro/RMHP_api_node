const pool = require("../../db");
const queries = require("../queries/Projects");

const createProject = async (data) => {
  const { name, location, description, dateStarted, imageUrls } = data;
  return pool.query(queries.CREATE_PROJECT, [
    name,
    location,
    description,
    dateStarted,
    imageUrls[0],
    imageUrls[1],
    imageUrls[2],
  ]);
};

const getAllProjects = async () => {
  return pool.query(queries.GET_ALL_PROJECTS);
};

const getProjectById = async (id) => {
  return pool.query(queries.GET_PROJECT_BY_ID, [id]);
};

const updateProject = async (id, data) => {
  const { name, location, description, dateStarted, imageUrls } = data;
  return pool.query(queries.UPDATE_PROJECT, [
    name,
    location,
    description,
    dateStarted,
    imageUrls[0],
    imageUrls[1],
    imageUrls[2],
    id,
  ]);
};

const deleteProject = async (id) => {
  return pool.query(queries.DELETE_PROJECT, [id]);
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
