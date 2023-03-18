import { AuthContext } from "../../../contexts/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export function ModalLogout(props) {
  const { isOpen, changeModal } = props,
    context = useContext(AuthContext),
    navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    context.setLoggedInUser(null);
    console.log("I am here");
    navigate("/");
  }

  if (isOpen) {
    return (
      <div className="z-50 bg-black/70 flex flex-col items-center justify-center border-2 fixed top-0 bottom-0 right-0 left-0 shadow-black shadow-lg">
        <div className="w-1/2 h-64 bg-stone-200 rounded-md p-auto m-auto flex flex-col items-center">
          <div className="w-11/12 border-b-2 border-gray-400/40 h-2/3 rounded-t-md flex flex-row justify-center items-center">
            <h1 className="text-3xl font bold">
              Are you sure you want to log out?
            </h1>
          </div>
          <div className="w-11/12 h-1/3 rounded-b-md flex flex-row justify-evenly items-center gap-8">
            <button
              className="btn-indigo bg-gray-700 hover:bg-gray-800"
              onClick={changeModal}
            >
              Close
            </button>
            <button className="btn-red" onClick={handleLogOut}>
              Log out
            </button>
          </div>
        </div>
      </div>
    );
  }
}
