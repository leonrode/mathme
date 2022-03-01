import { toast } from "react-toastify";

const notify = (text, type) => {
  if (type === "success") {
    toast.success(text, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
      hideProgressBar: true,
    });
  } else if (toast === "error") {
    toast.error(text, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
      hideProgressBar: true,
    });
  } else {
    throw new Error("unknown notification type");
  }
};

export default notify;
