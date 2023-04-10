import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { User } from "../context/AuthContext";
import { addRoleToUser, getRoles, removeRoleFromUser } from "../services/roles";
import { VscClose } from 'react-icons/vsc';

const EditUser = ({ user, setIsClosed }: { user: User, setIsClosed: () => void }) => {
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const queryClient = useQueryClient();
  const addRoleMut = useMutation({
    mutationFn: (roleId: string) => addRoleToUser(roleId, user.id.toString()),
    onSuccess: () => queryClient.invalidateQueries('users')
  });

  const removeRoleMut = useMutation({
    mutationFn: ({ roleId, userId }: { roleId: string, userId: string }) => removeRoleFromUser(roleId, userId),
    onSuccess: () => queryClient.invalidateQueries('users')
  });
  
  const { isLoading, isError, data: roles } = useQuery({
    queryFn: () => getRoles()
  });

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (isError) {
    return <p>{`No se pudo obtener info. de usuario...`}</p>;
  }


  const containsRole = (roleName: string) => {
    if (!roles) return;
    return user.roles.includes(roleName);
  }

  const handleAddRole= () => { 
    if (selectedRoleId == "") return;
    addRoleMut.mutate(selectedRoleId);
  };

  const handleRemoveRole= (roleName: string) => {
    const roleId = roles?.find(role => role.name == roleName)?.id;
    if (!roleId) return;
    removeRoleMut.mutate({ roleId: roleId.toString(), userId: user.id.toString() })
  }

  
  return (
    <div className="w-1/2 h-96 bg-white">
      <h2 className="font-semibold px-4 py-4 border-b border-gray-100">
        <div className="flex justify-between">
          Editar perfil
          <button onClick={e => setIsClosed()}>
            <VscClose className="text-2xl outline-offset-4" />
          </button>
        </div>
      </h2>
      <div className="px-2 mt-4">
        <div className="flex flex-col gap-2">
          <p className="border-b border-gray-100 px-2">Roles</p>
          <div className="flex gap-2">
            {user.roles.map(role => (
              <button key={role} className="bg-gray-200 rounded-xl px-2 py-0.5 flex gap-0.5"
                onClick={() => handleRemoveRole(role)} title="Remover este rol del usuario...">
                {role}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <label htmlFor="role">Rol</label>
          <select defaultValue="" onChange={e => setSelectedRoleId(e.target.value)} name="role" id="role">
            <option value="" disabled>Desplegar roles...</option>
            {roles?.map(role => (
              <option key={role.name} value={role.id} disabled={containsRole(role.name)}>
                { role.name }
              </option>
            ))}
          </select>
          <button onClick={handleAddRole}>Agregar</button>
        </div>
      </div>
    </div>
  )
};

export default EditUser;
