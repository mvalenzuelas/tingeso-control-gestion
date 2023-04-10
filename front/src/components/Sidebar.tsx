import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { CSSTransition } from "react-transition-group";
import useAuth from "../hooks/useAuth";
import { logout } from "../services/auth";
import SidebarLink from "./SidebarLink";
import SidebarTab from "./SidebarTab";


const SidebarBody = ({ isOpen }: { isOpen: boolean }) => {
  const { user, setUser } = useAuth();
  const nodeRef = useRef(null);
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({
    mutationFn: (vars) => logout(),
    onSuccess: () => {
      queryClient.invalidateQueries("auth");
      setUser(undefined);
    },
  });

  function handleLogout(){
    logoutMutation.mutate();
  }

  return(
    <CSSTransition 
      nodeRef={nodeRef} timeout={150} unmountOnExit
      in={isOpen} classNames="fade-sidebar-body">
      <div ref={nodeRef} className="mt-3 text-sm">
        {user && (<>
          <p className="my-4">Bienvenido, {user.firstName}.</p>
          <SidebarTab tabName="Perfil">
          <li>Editar</li>
          <li>Administrador</li>
          <li>
            <button className="hover:underline" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </li>
        </SidebarTab>
      </>)}

      {!user && (<>
        <p className="my-4">No estás conectado.</p>
        <SidebarTab tabName="Opciones">
          <SidebarLink to="/sign-in" label="Iniciar sesión" />
          <SidebarLink to="/sign-up" label="Registrarse" />
        </SidebarTab>
      </>)}
      </div>
    </CSSTransition>
  )
}
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${isOpen ? 'w-52' : 'sidebar'} transition-[width] duration-75 fixed left-0 top-0 h-full bg-gray-300 flex flex-col items-start pl-5`}>
      <button onClick={() => setIsOpen(prev => !prev)}
        className="focus:outline-offset-4 mt-8 flex flex-col gap-1 w-5 justify-center items-start">
        <div className={`border-b-2 border-b-black rounded-full ${isOpen ? 'w-full' : 'w-2'} transition-[width] duration-75`}></div>
        <div className={`border-b-2 border-b-black rounded-full ${isOpen ? 'w-full' : 'w-3.5'} transition-[width] duration-75`}></div>
        <div className={`border-b-2 border-b-black rounded-full ${isOpen ? 'w-full' : 'w-full'}`}></div>
      </button>
      <SidebarBody isOpen={isOpen} />
    </div>
  )
};

export default Sidebar;
