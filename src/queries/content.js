const GET_CONTENT = `
  SELECT * FROM content WHERE id = $1;
`;

const UPDATE_CONTENT = `
  UPDATE content
  SET who_we_are = $1,
      what_we_do = $2,
      projects_count = $3,
      beneficiaries_count = $4,
      volunteers_count = $5,
      vision = $6,
      mission = $7,
      updated_at = NOW()
  WHERE id = $8
  RETURNING *;
`;

const CREATE_CONTENT = `
  INSERT INTO content (who_we_are, what_we_do, projects_count, beneficiaries_count, volunteers_count, vision, mission)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;
`;

module.exports = {
  GET_CONTENT,
  UPDATE_CONTENT,
  CREATE_CONTENT,
};
