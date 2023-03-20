import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { ClientNavBar } from "../../components/ClientNavBar";
import toast from "react-hot-toast";
import bgImg from "../../images/vegetables-background.jpeg";

export function ClientOrderDetail() {
  const [order, setOrder] = useState({});
  const params = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get(`/api/order/get/${params.idOrder}`);
        console.log(response.data);
        setOrder(response.data);
        setisLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchOrders();
  }, [reload]);

  async function cancelOrder() {
    try {
      if (
        ["CANCELED", "CONCLUDED", "REJECTED BY COMPANY"].includes(orders.status)
      ) {
        toast.error(`Product already ${order.status}`);
      } else {
        await api.put(`/api/order/edit/status/${params.idOrder}`, {
          status: "CANCELED",
        });
        setReload(!reload);
        toast.success("Status updated!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen">
      <ClientNavBar className="z-10" />
      <div className="relative bg-gray-800 mt-0 py-8 min-h-screen">
        <img
          src={bgImg}
          className="z-0 absolute top-0 bottom-0 right-0 left-0 w-full h-full opacity-40"
        />
        <div className="z-10 m-auto py-6 flex flex-col gap-8 items-center bg-slate-100 border-2 border-black/90 rounded-xl w-1/2 drop-shadow-2xl drop-shadow-black">
          <h1 className="text-center text-5xl underline">
            Here is your order:
          </h1>
          {!isLoading && (
            <>
              <section className="w-full px-16">
                <div className="flex flex-row flex-nowrap">
                  <div className="text-sm border-r-2 w-2/3">
                    <ul>
                      <li>
                        <span className="font-semibold">- Product: </span>
                        {order.product.name}.
                      </li>
                      <li>
                        <span className="font-semibold">- Business: </span>
                        {order.business.name}.
                      </li>
                      <li>
                        <span className="font-semibold">- Client: </span>
                        {order.client.name}.
                      </li>
                      <li>
                        <span className="font-semibold">- Price: </span>
                        {`R$ ${Math.floor(order.product.price / 100)},${
                          String(order.product.price)[
                            String(order.product.price).length - 2
                          ]
                        }${
                          String(order.product.price)[
                            String(order.product.price).length - 1
                          ]
                        }`}
                        .
                      </li>
                      <li className="flex flex-row justify-start items-start flex-nowrap gap-1">
                        <h3 className="font-semibold w-fit">- Description:</h3>
                        <p className="italic text-sm w-3/5 border-l-2 text-gray-600 pl-1">
                          {order.product.description}
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="w-1/3 flex flex-row justify-center items-center px-4">
                    <img
                      src={order.product.picture}
                      alt="food ordered"
                      className="w-28 h-28 rounded-lg shadow-black shadow-md"
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-center">
                  <h3 className="mt-4 font-bold text-2xl">
                    <span>Status: </span>
                    {order.status}.
                  </h3>
                </div>
                <div className="text-center mt-4">
                  <button onClick={cancelOrder} className="btn-green">
                    Cancel order
                  </button>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
