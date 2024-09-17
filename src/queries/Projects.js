const CREATE_PROJECT = `
  INSERT INTO projects (name, location, description, date_started, image_url1, image_url2, image_url3)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;
`;

const GET_ALL_PROJECTS = `
  SELECT * FROM projects;
`;

const GET_PROJECT_BY_ID = `
  SELECT * FROM projects WHERE id = $1;
`;

const UPDATE_PROJECT = `
  UPDATE projects
  SET name = $1,
      location = $2,
      description = $3,
      date_started = $4,
      image_url1 = $5,
      image_url2 = $6,
      image_url3 = $7
  WHERE id = $8
  RETURNING *;
`;

const DELETE_PROJECT = `
  DELETE FROM projects WHERE id = $1 RETURNING *;
`;

module.exports = {
  CREATE_PROJECT,
  GET_ALL_PROJECTS,
  GET_PROJECT_BY_ID,
  UPDATE_PROJECT,
  DELETE_PROJECT,
};
