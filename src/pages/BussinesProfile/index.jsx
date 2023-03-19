import { useState, useEffect } from "react";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { ModalLogout } from "../../components/Modal/ModalLogout";
import { BusinessNavBar } from "../../components/BusinessNavBar";

export function BusinessProfile() {
  const [form, setForm] = useState([]),
    [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchForms() {
      try {
        const response = await api.get("/api/user/get");
        const matchCnpj = response.data.cnpj.match(
          /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/
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
        response.data.cnpj = `${matchCnpj[1]}.${matchCnpj[2]}.${matchCnpj[3]}/${matchCnpj[4]}- ${matchCnpj[5]}`;
        setForm(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchForms();
  }, []);

  function funcShowModal() {
    setShowModal(!showModal);
  }

  return (
    <div className="min-h-screen min-w-fit">
      <BusinessNavBar />
      <ModalLogout isOpen={showModal} changeModal={funcShowModal} />
      <section className="w-full flex flex-col items-center">
        <h1 className="font-semibold mb-4 text-3xl text-black">
          Your profile here
        </h1>
        <img
          src={form.picture}
          className="w-56 h-56 rounded-full mb-5 border-2 border-black"
        />
        <div className="bg-white rounded-xl mb-2 justify-evenly flex flex-row gap-4 flex-nowrap items-start w-fit border border-green-900 border-t-4 border-t-green-800 box-border p-6">
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
            <p className="font-semibold text-lg">Business Type</p>
            <p className="text-sm">{form.businessType}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Address</p>
            <p className="text-sm">{form.address}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Neighborhood</p>
            <p className="text-sm">{form.neighborhood}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">CNPJ</p>
            <p className="text-sm">{form.cnpj}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Contact Phone</p>
            <p className="text-sm">{form.contactPhone}</p>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-10 mt-2 pb-4">
          <Link to={"/business/profile/edit"}>
            <button className="btn-green">Edit</button>
          </Link>
          <button
            onClick={funcShowModal}
            type="submit"
            className="btn-indigo bg-red-500 hover:bg-red-600"
          >
            Log out
          </button>
        </div>
      </section>
    </div>
  );
}
