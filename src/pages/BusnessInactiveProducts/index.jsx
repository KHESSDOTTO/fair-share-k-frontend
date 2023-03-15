import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { BusinessNavBar } from "../../components/BusinessNavBar";

export function BusinessInactiveProducts() {
  const [isLoading, setisLoading] = useState(true),
    [myProducts, setMyProducts] = useState([]),
    [reload, setReload] = useState(false),
    navigate = useNavigate();

  useEffect(() => {
    async function fetchInactiveProducts() {
      try {
        const response = await api.get("/api/product/get/myProducts");
        setMyProducts(response.data.products);
        console.log(response.data);
        setisLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchInactiveProducts();
  }, [reload]);

  function handleNavigateProduct(e) {
    try {
      navigate(`/business/viewProduct/${e.target.value}`);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(e) {
    try {
      await api.delete(`/api/product/delete/${e.target.value}`);
      toast.success("Product excluded.");
      setReload(!reload);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Please, try again.");
    }
  }

  async function handleReactivate(e) {
    try {
      await api.put(`/api/product/reactivate/${e.target.value}`);
      toast.success("Product reactivated.");
      setReload(!reload);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen bg-stone-400 pb-4">
      <BusinessNavBar />
      <div className="flex flex-row justify-center py-8 bg-white/70 rounded drop-shadow-lg flex justify-center gap-20 items-end px-16 border-b-4 border-indigo-900 w-10/12 mx-auto mb-4">
        <h1 className="text-4xl text-black italic">Inactive Products</h1>
      </div>
      <section className="w-2/3 italic overflow-auto bg-white/50 rounded-xl border-2 mt-2 h-80 flex flex-col items-center justify-between mx-auto flex-nowrap gap-8 mt-5 py-5">
        {!isLoading &&
          myProducts
            .filter((cP) => cP.isActive === false)
            .map((cP) => {
              return (
                <article
                  className="w-11/12 max-h-full flex flex-row flex-wrap items-center justify-between px-4 border-b-2 border-gray-500 pb-6"
                  key={cP._id}
                >
                  <div className="w-2/10 flex flex-row justify-center">
                    <img
                      src={cP.picture}
                      alt="Product"
                      className="w-24 h-24 rounded-lg shadow-xl max-h-full"
                    />
                  </div>
                  <div className="w-3/10 flex flex-row justify-start">
                    <ul>
                      <li>
                        <span className="font-semibold">- Product: </span>
                        {cP.name}
                      </li>
                      <li>
                        <span className="font-semibold">- Price:</span>{" "}
                        {`R$ ${Math.floor(cP.price / 100)},${
                          String(cP.price)[String(cP.price).length - 2]
                        }${String(cP.price)[String(cP.price).length - 1]}`}
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-row gap-8">
                    <button
                      value={cP._id}
                      className="btn-indigo italic"
                      onClick={handleNavigateProduct}
                    >
                      View
                    </button>
                    <button
                      value={cP._id}
                      className="btn-indigo bg-green-700 hover:bg-green-600 italic"
                      onClick={handleReactivate}
                    >
                      Reactivate
                    </button>
                    <button
                      value={cP._id}
                      className="btn-indigo bg-red-500 hover:bg-red-600 italic"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              );
            })}
      </section>
    </div>
  );
}
