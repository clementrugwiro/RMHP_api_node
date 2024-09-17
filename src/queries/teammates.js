const CREATE_TEAMMATE= `INSERT INTO teammates (name, profession, social_media, image_url)
                        VALUES ($1, $2, $3, $4)
                        RETURNING *`
const GET_ALL_TEAMMATES= `SELECT * FROM teammates`
const GET_TEAMMATE_BY_ID= `SELECT * FROM teammates WHERE id = $1`
const DELETE_TEAMMATE= `DELETE FROM teammates WHERE id = $1 RETURNING *`


const UPDATE_TEAMMATE = `
  UPDATE teammates
  SET name = $1,
      profession = $2,
      social_media = $3,
      image_url = $4
  WHERE id = $5
  RETURNING *;
`;




module.exports ={
    CREATE_TEAMMATE,
    GET_ALL_TEAMMATES,
    GET_TEAMMATE_BY_ID,
    UPDATE_TEAMMATE,
    DELETE_TEAMMATE
}