const getErrorMessage = (errorType) => {
  switch (errorType) {
    case "OAuthAccountNotLinked":
      return "The email associated with this provider is already registered with another provider.";
    case "Default":
      return "An error occured signing in. Try again in a few moments.";
  }
  return "";
};

export { getErrorMessage };
