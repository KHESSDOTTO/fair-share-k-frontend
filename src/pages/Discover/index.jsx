export function Discover() {
  return (
    <>
      <h1>Nossa página de Discover aqui</h1>
    </>
  );
}

// export function Discover() {
//   return (
//     <>
//       <div className="container">
//         <form className="space-y-8 divide-y divide-gray-200">
//           <div className="space-y-8 divide-y divide-gray-200">
//             <div className="pt-8">
//               <div>
//                 <h3 className="text-base font-semibold leading-6 text-gray-900">
//                   {form.name}{" "}
//                 </h3>
//                 <p className="mt-1 text-sm text-gray-500">
//                   Update profile here!
//                 </p>
//               </div>
//               <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
//                 <div className="sm:col-span-3">
//                   <label
//                     htmlFor="first-name"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Name:
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       onSubmit={handleChange}
//                       value={form.name}
//                       type="text"
//                       name="name"
//                       id="name"
//                       autoComplete="given-name"
//                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                   </div>
//                 </div>

//                 <div className="sm:col-span-3">
//                   <label
//                     htmlFor="last-name"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Phone number:
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       onChange={handleChange}
//                       value={form.contactPhone}
//                       type="text"
//                       name="contactPhone"
//                       id="contactPhone"
//                       autoComplete="contact-phone"
//                       className="focus:ring-inest block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                   </div>
//                 </div>

//                 <div className="sm:col-span-4">
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Email address:
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       onChange={handleChange}
//                       value={form.email}
//                       id="email"
//                       name="email"
//                       type="email"
//                       autoComplete="email"
//                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                   </div>
//                 </div>

//                 <div className="sm:col-span-3">
//                   <label
//                     htmlFor="type"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Type:
//                   </label>
//                   <div className="mt-1">
//                     <select
//                       id="type"
//                       name="type"
//                       autoComplete="user-type"
//                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     >
//                       <option>Client</option>
//                       <option>Business</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="sm:col-span-6">
//                   <label
//                     htmlFor="street-address"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Street address
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       onChange={handleChange}
//                       value={form.address}
//                       type="text"
//                       name="street-address"
//                       id="street-address"
//                       autoComplete="street-address"
//                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                   </div>
//                 </div>

//                 <div className="sm:col-span-2">
//                   <label
//                     htmlFor="neighborhood"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Neighbordhood
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       onChange={handleChange}
//                       value={form.neighborhood}
//                       type="text"
//                       name="neighborhood"
//                       id="neighborhood"
//                       autoComplete="address-neighborhood"
//                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                   </div>
//                 </div>

//                 <div className="sm:col-span-2">
//                   <label
//                     htmlFor="cpf"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     CPF{" "}
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       onChange={handleChange}
//                       value={form.cpf}
//                       type="text"
//                       name="cpf"
//                       id="cpf"
//                       autoComplete="cpf"
//                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                   </div>
//                 </div>

//                 <div className="sm:col-span-2">
//                   <label
//                     htmlFor="postal-code"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     ZIP / Postal code
//                   </label>
//                   <div className="mt-1">
//                     <input
//                       type="text"
//                       name="postal-code"
//                       id="postal-code"
//                       autoComplete="postal-code"
//                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="pt-5">
//             <div className="flex justify-end">
//               <button
//                 onClick={handleChange}
//                 type="button"
//                 className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={handleLogOut}
//                 type="submit"
//                 className="ml-3 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Log out
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }
