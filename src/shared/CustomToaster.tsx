import { ToastContainer, toast } from "react-toastify";

export const CustomToaster = () => {
  return <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />;
};

export const Notify = (message, type) => {
  if (type === "error") return toast.error(message);
  return toast.success(message);
};
