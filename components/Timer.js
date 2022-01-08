import { useEffect, useState } from "react";

function formatSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds - minutes * 60;

  return `${minutes < 10 ? "0" + minutes : minutes}:${
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
  }`;
}

function padNumber(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setSeconds(seconds + 1), 1000);

    return () => clearTimeout(timeout);
  }, [seconds]);

  return <h3 className="text-text text-xl">{formatSeconds(seconds)}</h3>;
}

export default Timer;
