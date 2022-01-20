import axios from "axios";

const searchTopics = async (prompt) => {
  if (prompt === "") prompt = "all";

  const result = await axios.get(`/api/search?prompt=${prompt}`);
  const data = result.data;

  return data.results;
};

const getUserPlaylists = async () => {
  const result = await axios.get("/api/user/playlists");

  return result.data.playlists;
};

const deletePlaylist = async (playlistId) => {
  const result = await axios.post("/api/playlist/delete", { playlistId });
  if (result.status === 201) {
    return true;
  }

  return false;
};

const createPlaylist = async (number, title, topics) => {
  if (title === "") title = `My Playlist #${number}`;

  const result = await axios.post("/api/playlist/create", { title, topics });

  return result.data.playlistId;
};

const savePlaylist = async (id, title, topics) => {
  const result = await axios.post("/api/playlist/save", {
    playlistId: id,
    title,
    topics,
  });
  return true;
};
const fetchNewProblem = async (topicId) => {
  const result = await axios.get(`/api/question/${parseInt(topicId)}`);
  const data = result.data;

  return data;
};

const verifyAnswer = async (
  topicId,
  questionLatex,
  questionString,
  responseFields
) => {
  const result = await axios.post("/api/verify", {
    topicId,
    responseFields,
    responseFields,
    questionLatex,
    questionString,
  });

  const { isCorrect } = result.data;
  return isCorrect;
};
export {
  searchTopics,
  getUserPlaylists,
  deletePlaylist,
  createPlaylist,
  savePlaylist,
  fetchNewProblem,
  verifyAnswer,
};
