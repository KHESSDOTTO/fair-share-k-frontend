import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import img from "../../images/background-log-in.png";
import toast from "react-hot-toast";

export function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(AuthContext);
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/api/user/login", form);
      setLoggedInUser({ ...response.data });
      console.log(response);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      if (response.data.user.type === "BUSINESS") {
        navigate("/business/admin");
      } else {
        navigate("/user/discover");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Could not login. Please insert valid credentials, confirm your account or sign up."
      );
    }
  }

  return (
    <div className="bg-white/90 w-screen min-h-screen flex flex-row">
      <img src={img} alt="" className="max-h-screen mx-auto" />
      <div className="flex flex-col justify-center w-1/2 items-start px-24">
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
