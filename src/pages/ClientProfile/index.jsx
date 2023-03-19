import { useState, useEffect } from "react";
import { api } from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import { ClientNavBar } from "../../components/ClientNavBar";
import { ModalLogout } from "../../components/Modal/ModalLogout";
import toast from "react-hot-toast";

export function ClientProfile() {
  const [form, setForm] = useState([]),
    [orders, setOrders] = useState([]),
    [isLoading, setisLoading] = useState(true),
    [reload, setReload] = useState(false),
    [showModal, setShowModal] = useState(false),
    navigate = useNavigate();

  useEffect(() => {
    async function fetchForms() {
      try {
        let response = await api.get("/api/user/get");
        const responseOrders = await api.get("/api/order/get/myOrders");
        const matchCpf = response.data.cpf.match(
          /^(\d{3})(\d{3})(\d{3})(\d{2})/
        );
        let matchPhone;
        if (response.data.contactPhone.length === 10) {
          matchPhone = response.data.contactPhone.match(
            /^(\d{2})(\d{4})(\d{4})/
          );
        }
        if (response.data.contactPhone.length === 11) {
          matchPhone = response.data.contactPhone.match(
            /^(\d{2})(\d{5})(\d{4})/
          );
        }
        response.data.contactPhone = `(${matchPhone[1]}) ${matchPhone[2]}-${matchPhone[3]}`;
        response.data.cpf = `${matchCpf[1]}.${matchCpf[2]}.${matchCpf[3]}-${matchCpf[4]}`;
        setForm(response.data);
        setOrders(responseOrders.data.orders);
        setisLoading(false);
        console.log(responseOrders);
      } catch (err) {
        console.log(err);
      }
    }
    fetchForms();
  }, [reload]);

  function funcShowModal() {
    setShowModal(!showModal);
  }

  async function handleDeleteOrder(e) {
    try {
      await api.delete(`/api/order/delete/${e.target.value}`);
      setReload(!reload);
      toast.success("Order deleted!");
    } catch (err) {
      console.log(err);
      toast.error("SOmething went wrong... please try again.");
    }
  }

  function handleNavigate(e) {
    try {
      navigate(`/user/viewOrder/${e.target.value}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen mx-0">
      <ClientNavBar />
      <ModalLogout isOpen={showModal} changeModal={funcShowModal} />
      <section className="w-fit flex flex-col items-center mt-4">
        <h1 className="font-semibold mb-4 text-3xl text-black">
          Your profile here
        </h1>
        <img
          src={form.picture}
          className="w-56 h-56 rounded-full mb-5 border-2 border-black"
        ></img>
        <div className="bg-white max-w-full justify-evenly items-start flex flex-row flex-nowrap gap-4 flex-wrap w-fit border-t-4 border border-green-900/40 border-t-green-800/80 box-border p-6 rounded-xl">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Name</p>
            <p className="text-sm">{form.name}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Email</p>
            <p className="text-sm">{form.email}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Type</p>
            <p className="text-sm">{form.type}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Address</p>
            <p className="text-xs italic">{form.address}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Neighborhood</p>
            <p className="text-sm">{form.neighborhood}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">CPF</p>
            <p className="text-sm">{form.cpf}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Contact Phone</p>
            <p className="text-sm">{form.contactPhone}</p>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-8 mt-2">
          <Link to={"/user/profile/edit"}>
            <button className="btn-indigo bg-indigo-500/90">Edit</button>
          </Link>
          <button onClick={funcShowModal} type="submit" className="btn-red">
            Log out
          </button>
        </div>
        <div className="mt-6">
          <h1 className="font-semibold mb-4 text-3xl text-black border-t border-t-black/40 w-screen text-center pt-4">
            Your orders here
          </h1>
          <section className="bg-white container flex flex-col items-center justify-between flex-wrap mt-5 py-5 w-9/12 bg-slate-100 border-2 border-black">
            {!isLoading &&
              orders.map((currentOrder) => {
                return (
                  <article
                    key={currentOrder._id}
                    className="w-11/12 max-h-full flex flex-row flex-wrap items-center justify-between px-2 border-b-2 py-4 border-b-green-900/10 text-sm"
                  >
                    <div className="w-2/10 flex flex-row justify-center">
                      <img
                        src={currentOrder.business.picture}
                        alt="product picture"
                        className="w-16 h-16 rounded-full max-h-full"
                      />
                    </div>
                    <div className="w-3/10 flex flex-row justify-start">
                      <ul>
                        <li>
                          <span className="font-semibold">- Business: </span>
                          {currentOrder.business.name}
                        </li>
                        <li>
                          <span className="font-semibold">- Product: </span>
                          {currentOrder.product.name}
                        </li>
                        <li>
                          <span className="font-semibold">- Price:</span>{" "}
                          {`R$ ${Math.floor(
                            currentOrder.product.price / 100
                          )},${
                            String(currentOrder.product.price)[
                              String(currentOrder.product.price).length - 2
                            ]
                          }${
                            String(currentOrder.product.price)[
                              String(currentOrder.product.price).length - 1
                            ]
                          }`}
                        </li>
                      </ul>
                    </div>
                    <div className="w-36 flex justify-start flex-wrap">
                      <h2 className="w-11/12 font-bold font-color-gray-200">
                        <span className="font-semibold">Status: </span>
                        {currentOrder.status}
                      </h2>
                    </div>
                    <div className="w-2/10">
                      <button
                        value={currentOrder._id}
                        className="btn-green bg-green-600/60"
                        onClick={handleNavigate}
                      >
                        View
                      </button>
                    </div>
                    <div className="w-1/10">
                      <button
                        value={currentOrder._id}
                        className="btn-red"
                        onClick={handleDeleteOrder}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                );
              })}
          </section>
        </div>
      </section>
    </div>
  );
}
