import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { api } from "../../../api/api";

export function ModalReactivateUser(props) {
  const { isOpen, changeModal, form } = props,
    { setLoggedInUser } = useContext(AuthContext),
    navigate = useNavigate();

  async function handleReactivate() {
    try {
      const response = await api.post("/api/user/login", form);
      await api.put(`/api/user/reactivate/${response.data.user._id}`);
      console.log(response);
      setLoggedInUser({ ...response.data });
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      if (response.data.user.type === "BUSINESS") {
        navigate("/business/admin");
      }
      if (response.data.user.type === "CLIENT") {
        navigate("/user/discover");
      }
    } catch (err) {
      console.log(err);
      toast.error(
        "Something went wrong on the reactivation of your account. Please, try again."
      );
    }
  }

  return (
    <div className="z-50 bg-black/70 flex flex-col items-center justify-center border-2 fixed top-0 bottom-0 right-0 left-0 shadow-black shadow-lg">
      <div className="w-1/2 h-64 bg-stone-200 rounded-md p-auto m-auto flex flex-col items-center">
        <div className="w-11/12 border-b-2 border-gray-400/40 h-2/3 rounded-t-md flex flex-row justify-center items-center">
          <h1 className="text-3xl font bold">
            Do you want to reactivate your account?
          </h1>
        </div>
        <div className="w-11/12 h-1/3 rounded-b-md flex flex-row justify-evenly items-center gap-8">
          <button
            className="btn-indigo bg-gray-600 hover:bg-gray-800"
            onClick={changeModal}
          >
            Cancel
          </button>
          <button className="btn-green" onClick={handleReactivate}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
