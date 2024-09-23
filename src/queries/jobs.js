const CREATE_JOB = `
  INSERT INTO jobs (position_name, description, requirements, posted_date, due_date)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
`;

const GET_ALL_JOBS = `
  SELECT * FROM jobs
  ORDER BY posted_date DESC;
`;

const GET_JOB_BY_ID = `
  SELECT * FROM jobs
  WHERE id = $1;
`;

const UPDATE_JOB = `
  UPDATE jobs
  SET position_name = $1,
      description = $2,
      requirements = $3,
      posted_date = $4,
      due_date = $5,
      updated_at = CURRENT_TIMESTAMP
  WHERE id = $6
  RETURNING *;
`;

const DELETE_JOB = `
  DELETE FROM jobs
  WHERE id = $1
  RETURNING *;
`;

module.exports = {
  CREATE_JOB,
  GET_ALL_JOBS,
  GET_JOB_BY_ID,
  UPDATE_JOB,
  DELETE_JOB,
};
