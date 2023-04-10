import { FormEvent, useEffect, useState } from "react";
import RoundInput from "./RoundInput";

import { ImSpinner10 } from 'react-icons/im';
import { BsFillEyeFill } from 'react-icons/bs';
import { MdAttachEmail } from 'react-icons/md';
import { useMutation } from "react-query";
import { login } from "../services/auth";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { user, setUser } = useAuth();

  const navigate = useNavigate();
  
  const loginMutation = useMutation({
    mutationFn: (form: FormData) => login(form),
    onSuccess: (data) => {
      console.log("Success logged", data);
      setUser(data);
    }
  })

  useEffect(() => {
    if (!user) {
      return;
    }
    
    const timeoutId = setTimeout(() => {
      navigate("/home");
    }, 1 * 1000);
    return () => clearTimeout(timeoutId);
  }, [user]);

  const [fieldErrs, setFieldErrs] = useState<string[]>([]);

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const form = new FormData(evt.currentTarget);

    const errors = [];
    for (let [name, value] of form.entries()){
      if (value.toString().trim() == '') {
        errors.push(name);
      }
    }
    setFieldErrs(errors);
    if (errors.length > 0) return;
    loginMutation.mutate(form);
  }
  
  const errNames = fieldErrs.join(", ");
  
  return (
    <div className="shadow-sm mt-12 bg-gray-50 px-6 py-3 w-3/4 rounded">
    <form onSubmit={e => handleSubmit(e)} className="flex flex-col items-center justify-center gap-4 w-full">

      <RoundInput label='Correo electrónico' name='email' type='email'
        icon={<MdAttachEmail className="fill-gray-500 text-xl" />} />
      
      <RoundInput label='Contraseña' name='password' type='password'
        icon={<BsFillEyeFill className="fill-gray-500 text-xl" />} />

      {fieldErrs.length > 0 && <div className="w-full font-semibold text-sm text-rose-600 flex items-start">
        <p>Los siguientes campos no pueden estar en blanco: {errNames}.</p>
      </div>}
      
      <div className="flex gap-24">
        <button className="rounded-full hover:underline text-black">
          Olvidé mi contraseña
        </button>
        <button type="submit" 
          disabled={loginMutation.isLoading}
          className="disabled:opacity-50 rounded-full bg-blue-400 px-24 py-3 hover:bg-blue-300 text-white font-medium">
          Iniciar sesión
        </button>
      </div>
      {user && (<p className="flex gap-2 items-center">
        <ImSpinner10 className="animate-spin" />
        Inicio de sesión correcto. Te estamos redirigiendo a la página principal...
      </p>)}
    </form>
  </div>
  )
};

export default LoginForm;
