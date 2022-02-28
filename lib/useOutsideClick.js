import { useEffect } from "react";

const useOutsideClick = (ref, onOutsideDetection) => {
  useEffect(() => {
    const isOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        return onOutsideDetection();
      }
    };

    document.addEventListener("mousedown", isOutside);

    return () => {
      document.removeEventListener("mousedown", isOutside);
    };
  }, []);
};

export default useOutsideClick;
