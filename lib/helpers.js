const generateTimeOfDay = () => {
  const hour = new Date().getHours();

  if (hour >= 0 && hour < 12) return "morning";
  else if (hour >= 12 && hour < 18) return "afternoon";
  else if (hour >= 18 && hour <= 23) return "evening";
};

const countStarredTopics = (topics) => {
  return topics.filter((topic) => topic.isStarred).length;
};

export { generateTimeOfDay, countStarredTopics };
