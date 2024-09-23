const pool = require("../../db");
const queries = require("../queries/jobs");

const createJob = async (data) => {
  const { position_name, description, requirements, posted_date, due_date } =
    data;
  return pool.query(queries.CREATE_JOB, [
    position_name,
    description,
    requirements,
    posted_date,
    due_date,
  ]);
};

const getAllJobs = async () => {
  return pool.query(queries.GET_ALL_JOBS);
};

const getJobById = async (id) => {
  return pool.query(queries.GET_JOB_BY_ID, [id]);
};

const updateJob = async (id, data) => {
  const { position_name, description, requirements, posted_date, due_date } =
    data;
  return pool.query(queries.UPDATE_JOB, [
    position_name,
    description,
    requirements,
    posted_date,
    due_date,
    id,
  ]);
};

const deleteJob = async (id) => {
  return pool.query(queries.DELETE_JOB, [id]);
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};
