import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import img from "../../images/background-log-in.png";
import toast from "react-hot-toast";
import { ModalReactivateUser } from "../../components/Modal/ModalReactivateUser";

export function Login() {
  const [showModal, setShowModal] = useState(false),
    [form, setForm] = useState({
      email: "",
      password: "",
    }),
    navigate = useNavigate(),
    { setLoggedInUser } = useContext(AuthContext);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function funcShowModal() {
    setShowModal(!showModal);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/api/user/login", form);
      if (!response.data.user.isActive) {
        funcShowModal();
        return;
      }
      setLoggedInUser({ ...response.data });
      console.log(response);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      if (response.data.user.type === "BUSINESS") {
        navigate("/business/admin");
      }
      if (response.data.user.type === "CLIENT") {
        navigate("/user/discover");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Could not login. Please insert valid credentials, confirm your account or sign up."
      );
    }
  }

  console.log("showModal");
  console.log(showModal);

  return (
    <div className="bg-white/90 w-screen min-h-screen flex flex-col pb-8 gap-2 justify-center items-center md:flex-row">
      {showModal && (
        <ModalReactivateUser changeModal={funcShowModal} form={form} />
      )}
      <img src={img} alt="food" className="max-h-screen md:mx-auto" />
      <div className="flex flex-col justify-center items-start md:px-24 md:w-1/2">
        <section className="flex flex-col gap-12">
          <h1 className="text-5xl font-bold text-center">Log in</h1>
          <div className="w-10/12 flex flex-col justify-center items-center m-auto">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col chat-notification-title gap-6 w-72">
                <div className="flex flex-col">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="rounded-xl"
                    placeholder="email"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Senha:</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="rounded-xl"
                    placeholder="password"
                  />
                </div>
              </div>
              <div className="flex flex-row mx-auto mt-12 justify-evenly">
                <button type="submit" className="btn-indigo text-center">
                  Log in!
                </button>
                <Link to="/signup">
                  <button className="btn-indigo">Sign up</button>
                </Link>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
