import Parse from "parse";

// Get info for all songs
export const getAllSongs = async () => {
  const Song = Parse.Object.extend("Song");
  const query = new Parse.Query(Song);
  return query.find().then((results) => {
    return results;
  });
};

// Get info for a single song by ID
export const getSongById = async (id) => {
  const Song = Parse.Object.extend("Song");
  const query = new Parse.Query(Song);
  query.equalTo("objectId", id);
  return query.first().then((result) => {
    return result;
  });
};