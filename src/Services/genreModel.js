import Parse from "parse";

// Get info for all genres
export const getAllGenres = async () => {
  const Genre = Parse.Object.extend("Genre");
  const query = new Parse.Query(Genre);
  return query.find().then((results) => {
    return results;
  });
};

// Get info for a single genre by ID
export const getGenreById = async (id) => {
  const Genre = Parse.Object.extend("Genre");
  const query = new Parse.Query(Genre);
  query.equalTo("objectId", id);
  return query.first().then((result) => {
    return result;
  });
};
