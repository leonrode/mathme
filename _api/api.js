import axios from "axios";

const searchTopics = async (prompt) => {
  if (prompt === "") prompt = "all";

  const result = await axios.get(`/api/search?prompt=${prompt}`);

  return result.data.results;
};

const getPlaylist = async (playlistId) => {
  const result = await axios.get(`/api/playlist/${playlistId}`);

  return result.data.playlist;
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

const starPlaylist = async (playlistId) => {
  const result = await axios.post("/api/playlist/star", {
    playlistId: playlistId,
  });

  return true;
};

const fetchNewQuestion = async (topicId) => {
  const result = await axios.get(`/api/question/${parseInt(topicId)}`);

  return result.data;
};

const fetchQuestions = async (topicId, count) => {
  const result = await axios.get(
    `/api/question/${parseInt(topicId)}?count=${parseInt(count)}`
  );

  return result.data.questions;
};

const fetchMixedQuestions = async (playlistId, count) => {
  const result = await axios.get(
    `/api/question/mix?playlistId=${playlistId}&count=${count}`
  );

  return result.data.questions;
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
  starPlaylist,
  fetchNewQuestion,
  fetchQuestions,
  fetchMixedQuestions,
  verifyAnswer,
  signUp,
};
