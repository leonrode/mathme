const reducer = (state, action) => {
  let newState;
  let _topic;
  switch (action.type) {
    case "add":
      _topic = {
        topic: action.topic,
        isStarred: false,
        noQuestions: 10,
        isRandom: false,
        min: null,
        max: null,
      };

      newState = [...state.addedTopics, _topic];
      console.log(newState);
      return { addedTopics: newState };
    case "remove":
      newState = [
        ...state.addedTopics.slice(0, action.index),
        ...state.addedTopics.slice(action.index + 1),
      ];

      return { addedTopics: newState };

    case "moveup":
      if (action.index !== 0) {
        const original = [...state.addedTopics];
        const temp = state.addedTopics[action.index - 1];
        original[action.index - 1] = original[action.index];
        original[action.index] = temp;

        return { addedTopics: original };
      }
      return { addedTopics: state.addedTopics }; // return unchanged if there's no change
    case "movedown":
      if (action.index !== state.addedTopics.length - 1) {
        const original = [...state.addedTopics];
        const temp = state.addedTopics[action.index + 1];
        original[action.index + 1] = original[action.index];
        original[action.index] = temp;

        return { addedTopics: original };
      }
      return { addedTopics: state.addedTopics };

    case "star":
      _topic = { ...state.addedTopics[action.index] };
      _topic.isStarred = !_topic.isStarred;

      const newTopics = [
        ...state.addedTopics.slice(0, action.index),
        _topic,
        ...state.addedTopics.slice(action.index + 1),
      ];

      return { addedTopics: newTopics };
    case "change":
      newTopics = [
        ...state.addedTopics.slice(0, action.index),
        action.newObject,
        ...state.addedTopics.slice(action.index + 1),
      ];
      console.log(newTopics);
      return { addedTopics: newTopics };
    case "set":
      return { addedTopics: action.addedTopics };
    default:
      throw new Error("Create reducer action type not recognized");
  }
};

export default reducer;
