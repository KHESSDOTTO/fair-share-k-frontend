import { useState, useEffect } from "react";
import { api } from "../../api/api";
import { ClientNavBar } from "../../components/ClientNavBar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function ClientFavorites() {
  const [favorites, setFavorites] = useState([]),
    [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await api.get("/api/user/get/all-favorites");
        console.log(response.data.favorites);
        setFavorites(response.data.favorites);
      } catch (err) {
        console.log(err);
      }
    }
    fetchFavorites();
  }, [reload]);

  async function handleUnfollow(e) {
    try {
      await api.put(`/api/user/edit/favorites/${e.target.value}`);
      setReload(!reload);
      toast.success("Unfollowed!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong... please try again.");
    }
  }

  return (
    <div>
      <ClientNavBar />
      <h1 className="w-1/3 font-semibold text-3xl text-black pl-28 pb-5 underline">
        Your favorites:
      </h1>
      <section className="w-screen flex flex-col items-center min-h-screen">
        <div className="w-8/12 pt-2 rounded flex flex-col items-center gap-2">
          {favorites.map((currentFavorite) => {
            console.log("Current favorite below:");
            console.log(currentFavorite);
            return (
              <article
                key={currentFavorite._id}
                className="flex bg-white flex-row border border-indigo-900 items-center w-10/12 rounded-xl w-full px-4 py-6 h-40"
              >
                <div className="w-1/3 h-full flex flex-row justify-center">
                  <img
                    src={currentFavorite.picture}
                    className="w-24 h-24 rounded-full max-h-full border-2 border-black my-auto"
                  />
                </div>
                <div className="w-1/3 flex flex-col flex-nowrap items-center gap-2">
                  <h2 className="text-center text-3xl font-semibold text-gray-700">
                    {currentFavorite.name}
                  </h2>
                  <h3 className="text-center font-semibold italic text-gray-700 text-sm">
                    Neighborhood: {currentFavorite.neighborhood}
                  </h3>
                  <h3 className="italic text-center text-sm">
                    Address: {currentFavorite.address}
                  </h3>
                </div>
                <div className="w-1/3 text-center">
                  <button
                    value={currentFavorite._id}
                    className="btn-indigo bg-indigo-500"
                    onClick={handleUnfollow}
                  >
                    Unfollow
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
