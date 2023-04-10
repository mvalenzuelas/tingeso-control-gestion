import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getUsers } from "../services/user";
import EditUser from "./EditUser";
import Modal from "./Modal";

const RoleCrud = () => {

  const { isError, isLoading, data } = useQuery({
    queryKey: "users",
    queryFn: () => getUsers(),
  })

  const [selectedUserId, setSelectedUserId] = useState<null | number>(null);

  if (isError) {
    return <p>Hubo un error cargando los usuarios...</p>
  }

  if (isLoading) {
    return <p>Cargando usuarios...</p>
  }

  const isUserSelected = selectedUserId != null;
  const user = data?.find(u => u.id == selectedUserId);

  return (
    <div className="flex flex-col justify-center h-full">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Clientes</h2>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Nombre completo</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Roles</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Aceptado</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center">Editar</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {data?.map(u => (
                  <tr key={u.id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800">{`${u.lastName}, ${u.firstName}`}</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{u.email}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      {u.roles.join(", ") + "."}
                      <div className="text-left font-medium text-green-500">$2,890.66</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center">??</div>
                    </td>
                    <td className="p-2 whitespace-nowrap flex items-center justify-center">
                      <button onClick={() => setSelectedUserId(u.id)} className="group">
                        <AiFillEdit className="transition-[fill] group-hover:fill-blue-500 m-2 text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal isVisible={isUserSelected}>
        <EditUser setIsClosed={() => setSelectedUserId(null)} user={user!} />
      </Modal>
    </div>
  )
};

export default RoleCrud;
