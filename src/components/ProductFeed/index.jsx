import { api } from "../../api/api.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ProductFeed(props) {
  const { search } = props;
  const [productFeed, setProductFeed] = useState([]),
    [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAllProducts() {
      try {
        const response = await api.get("/api/product/get/all");
        setProductFeed(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllProducts();
  }, []);
  console.log(productFeed);
  return (
    <section className="w-screen flex flex-col items-center">
      <h1 className="font-semibold mb-4 text-4xl text-black">
        Available products
      </h1>
      <div className="flex flex-row justify-evenly flex-wrap w-11/12 border-t-2 border-t-gray-700/20 mx-auto box-border py-6 px-4">
        {!isLoading &&
          productFeed
            .filter((cE) => cE.isActive === true)
            .filter(
              (cE) =>
                cE.name.toLowerCase().includes(search.toLowerCase()) ||
                cE.creator.neighborhood
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                cE.creator.address.toLowerCase().includes(search.toLowerCase())
            )
            .map((cE) => {
              return (
                <article
                  key={cE._id}
                  className="container bg-white border border-green-700 flex flex-col justify-between items-center w-1/4 gap-4 justify-evenly py-5"
                >
                  <img
                    src={cE.picture}
                    alt="Product appearence."
                    className="rounded-2xl shadow-xl h-48 max-w-full"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-col items-center">
                      <h2 className="font-semibold text-3xl">{cE.name}</h2>
                      <h2 className="font-semibold text-2xl">
                        {`R$ ${Math.floor(cE.price / 100)},${
                          String(cE.price)[String(cE.price).length - 2]
                        }${String(cE.price)[String(cE.price).length - 1]}`}
                      </h2>
                    </div>
                    <p className="text-xs italic text-center">
                      Address: {cE.creator.address}.
                    </p>
                    <p className="text-sm font-semibold text-center">
                      Neighborhood: {cE.creator.neighborhood}.
                    </p>
                  </div>
                  <Link to={`/user/viewMagic/${cE._id}`}>
                    <button className="btn-green w-28">See details</button>
                  </Link>
                </article>
              );
            })}
      </div>
    </section>
  );
}
