import { toast } from "react-toastify";

import {
  MdCheck,
  MdErrorOutline,
  MdDeleteOutline,
  MdStar,
  MdStarOutline,
} from "react-icons/md";

const CustomCheck = () => <MdCheck size={40} className="text-success" />;

const CustomErrorOutline = () => (
  <MdErrorOutline size={40} className="text-error dark:text-darkError" />
);

const CustomDeleteOutline = () => (
  <MdDeleteOutline size={40} className="text-error dark:text-darkError" />
);

const CustomStar = () => (
  <MdStar size={40} className="text-warning dark:text-darkWarning" />
);
const CustomStarOutline = () => (
  <MdStarOutline size={40} className="text-warning dark:text-darkWarning" />
);

const notify = (text, type) => {
  if (type === "success") {
    toast(text, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
      icon: CustomCheck,
      hideProgressBar: true,
    });
  } else if (type === "delete") {
    toast(text, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
      icon: CustomDeleteOutline,
      hideProgressBar: true,
    });
  } else if (type === "star") {
    toast(text, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
      icon: CustomStar,
      hideProgressBar: true,
    });
  } else if (type === "unstar") {
    toast(text, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
      icon: CustomStarOutline,
      hideProgressBar: true,
    });
  } else if (type === "error") {
    toast(text, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 4000,
      icon: CustomErrorOutline,
      hideProgressBar: true,
    });
  } else {
    throw new Error("unknown notification type");
  }
};

export default notify;
