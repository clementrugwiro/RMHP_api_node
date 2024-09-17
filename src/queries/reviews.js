const CREATE_REVIEW = `
  INSERT INTO reviews (review, name, position)
  VALUES ($1, $2, $3)
  RETURNING *;
`;

const GET_ALL_REVIEWS = `
  SELECT * FROM reviews;
`;

const GET_REVIEW_BY_ID = `
  SELECT * FROM reviews WHERE id = $1;
`;

const UPDATE_REVIEW = `
  UPDATE reviews
  SET review = $1,
      name = $2,
      position = $3
  WHERE id = $4
  RETURNING *;
`;

const DELETE_REVIEW = `
  DELETE FROM reviews
  WHERE id = $1
  RETURNING *;
`;

module.exports = {
  CREATE_REVIEW,
  GET_ALL_REVIEWS,
  GET_REVIEW_BY_ID,
  UPDATE_REVIEW,
  DELETE_REVIEW,
};
