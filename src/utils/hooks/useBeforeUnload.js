import { useEffect } from "react";

const useBeforeUnload = (message) => {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [message]);
};

export default useBeforeUnload;
