import { api } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";
import toast from "react-hot-toast";

export function ModalDeleteUser(props) {
  const { isOpen, changeModal } = props,
    context = useContext(AuthContext),
    navigate = useNavigate();

  async function handleDeleteUser(e) {
    try {
      e.preventDefault();
      await api.delete("/api/user/delete");
      localStorage.removeItem("loggedInUser");
      context.setLoggedInUser(null);
      toast.success("User deleted.");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong... please try again.");
    }
  }

  if (isOpen) {
    return (
      <div className="z-50 bg-black/70 flex flex-col items-center justify-center border-2 fixed top-0 bottom-0 right-0 left-0 shadow-black shadow-lg">
        <div className="w-1/2 h-64 bg-stone-200 rounded-md p-auto m-auto flex flex-col items-center pb-4">
          <div className="w-11/12 border-b-2 border-gray-400/40 h-2/4 rounded-t-md flex flex-row justify-center items-center">
            <h1 className="text-3xl font bold">
              Are you sure you want to delete your account?
            </h1>
          </div>
          <div className="w-11/12 h-2/4 rounded-t-md flex flex-row justify-center items-center text-xl">
            <p>Please, confirm if your goal is really to delete your user.</p>
          </div>
          <div className="w-11/12 h-1/4 rounded-b-md flex flex-row justify-evenly items-center gap-8">
            <button
              className="btn-indigo bg-gray-700 hover:bg-gray-800"
              onClick={changeModal}
            >
              Cancel
            </button>
            <button className="btn-red" onClick={handleDeleteUser}>
              Delete account
            </button>
          </div>
        </div>
      </div>
    );
  }
}
