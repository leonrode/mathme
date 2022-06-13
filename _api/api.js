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
  const result = await axios.get(`/api/question/${~~topicId}`);

  return result.data;
};

const fetchQuestions = async (topicId, count) => {
  const result = await axios.get(`/api/question/${~~topicId}?count=${~~count}`);
  console.log(result)
  return result.data.questions;
};

const fetchMixedQuestions = async (playlistSlug, count) => {
  const result = await axios.get(
    `/api/question/mix?playlistSlug=${playlistSlug}&count=${count}`
  );

  return result.data.questions;
};

const fetchCategories = async () => {
  const result = await axios.get("/api/content/content");

  return result.data.content;
};

const verifyAnswer = async (
  topicId,
  questionLatex,
  questionString,
  responseFields,
  providedSolution
) => {
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

const addLike = async (playlistSlug) => {
  const result = await axios.post("/api/playlist/like", { playlistSlug });
  return result.data.newLikes;
};

const removeLike = async (playlistSlug) => {
  const result = await axios.post("/api/playlist/unlike", { playlistSlug });

  return result.data.newLikes;
};

const postCompletedQuestions = async (questions) => {
  const result = await axios.post("/api/stats/completed", { questions });
  return result.status === 201;
};

const fetchAllStats = async () => {
  try {
    const result = await axios.get("/api/stats/all");
    return result.data;
  } catch (e) {
    return null;
  }
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
  fetchCategories,
  verifyAnswer,
  signUp,
  addLike,
  removeLike,
  postCompletedQuestions,
  fetchAllStats,
};
