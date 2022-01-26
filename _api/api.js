import axios from "axios";

const searchTopics = async (prompt) => {
  if (prompt === "") prompt = "all";

  const result = await axios.get(`/api/search?prompt=${prompt}`);
  const data = result.data;

  return data.results;
};

const getPlaylist = async (playlistId) => {
  const result = await axios.get(`/api/playlist/${playlistId}`);

  const data = result.data;

  return data.playlist;
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

const fetchProblems = async (topicId, count) => {
  const result = await axios.get(
    `/api/question/${parseInt(topicId)}?count=${parseInt(count)}`
  );
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
    questionLatex,
    questionString,
  });

  const { isCorrect } = result.data;
  return isCorrect;
};

const signUp = async (username, password) => {
  const result = await axios.post("/api/auth/signup", { username, password });

  if (result.status === 201) return true;
  return false;
};

export {
  searchTopics,
  getPlaylist,
  getUserPlaylists,
  deletePlaylist,
  createPlaylist,
  savePlaylist,
  fetchNewProblem,
  fetchProblems,
  verifyAnswer,
  signUp,
};
