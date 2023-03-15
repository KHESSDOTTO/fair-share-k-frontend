import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { BusinessNavBar } from "../../components/BusinessNavBar";

export function BusinessInactiveProducts() {
  const [isLoading, setisLoading] = useState(true),
    [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    async function fetchInactiveProducts() {
      try {
        const response = await api.get("/api/product/get/myProducts");
        setMyProducts(response.data);
        setisLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchInactiveProducts();
  }, []);

  function handleNavigateProduct(e) {
    try {
      navigate(`/business/viewProduct/${e.target.value}`);
    } catch (err) {
      console.log(err);
    }
  }

  console.log(myProducts);

  return (
    <div className="min-h-screen">
      <BusinessNavBar />
      <div className="flex flex-row justify-center py-12 bg-white rounded drop-shadow-lg flex justify-center gap-20 items-end pb-12 px-16 border-b-4 border-indigo-900 w-10/12 mx-auto mb-4">
        <h1 className="text-6xl text-indigo-900 italic">Inactive Products</h1>
      </div>
      <section className="h-80">
        {!isLoading &&
          myProducts
            .filter((cP) => cP.isActive === false)
            .map((cP) => {
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
                <div className="w-2/10">
                  <button
                    value={cP._id}
                    className="btn-indigo"
                    onClick={handleNavigateProduct}
                  >
                    View
                  </button>
                </div>
              </article>;
            })}
      </section>
    </div>
  );
}
