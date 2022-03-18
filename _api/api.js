import axios from "axios";

const searchTopics = async (prompt) => {
  if (prompt === "") prompt = "all";

  const result = await axios.get(`/api/search?prompt=${prompt}`);

  return result.data.results;
};

const getPlaylist = async (playlistSlug) => {
  const result = await axios.get(`/api/playlist/${playlistSlug}`);

  return result.data.playlist;
};

const getUserPlaylists = async () => {
  const result = await axios.get("/api/user/playlists");

  return result.data.playlists;
};

const deletePlaylist = async (playlistSlug) => {
  const result = await axios.post("/api/playlist/delete", { playlistSlug });
  if (result.status === 201) {
    return true;
  }

  return false;
};

const createPlaylist = async (number, title, topics) => {
  if (title === "") title = `My Playlist #${number}`;
  const result = await axios.post("/api/playlist/create", { title, topics });

  return result.data.playlistSlug;
};

const savePlaylist = async (playlistSlug, title, topics) => {
  const result = await axios.post("/api/playlist/save", {
    playlistSlug,
    title,
    topics,
  });

  return true;
};

const starPlaylist = async (playlistSlug) => {
  const result = await axios.post("/api/playlist/star", {
    playlistSlug,
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

const fetchMixedQuestions = async (playlistSlug, count) => {
  const result = await axios.get(
    `/api/question/mix?playlistSlug=${playlistSlug}&count=${count}`
  );

  return result.data.questions;
};

const verifyAnswer = async (
  topicId,
  questionLatex,
  questionString,
  responseFields,
  providedSolution,
) => {
  console.log("tid", topicId);
  const result = await axios.post("/api/verify", {
    topicId,
    responseFields,
    questionLatex,
    questionString,
    providedSolution,
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
