import { FormEvent, useState } from 'react';
import { BsFillPersonVcardFill, BsFillEyeFill } from 'react-icons/bs';
import { MdAttachEmail } from 'react-icons/md';
import { useMutation } from 'react-query';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { register } from '../services/auth';

import RoundInput from './RoundInput';

const RegisterForm = () => {
  const { user } = useAuth();

  const navigator = useNavigate();
  const registerMutation = useMutation({
    mutationFn: (variables: FormData) => register(variables),
    onSuccess: () => {
      navigator("/sign-in");
    },
  })

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
    registerMutation.mutate(form);
  }

  const errNames = fieldErrs.join(", ");

  if (user) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="shadow-sm mt-12 bg-gray-50 px-6 py-3 w-3/4 rounded">
      <h1 className="text-3xl ml-4 font-bold">
        Registro nuevo usuario<span className="text-6xl text-blue-400">.</span>
      </h1>
      <h2 className="text-sm mb-8 ml-4 font-bold">
        ¿Ya estás registrado? <Link to="/sign-in" className="hover:underline text-blue-400">Inicia sesión</Link>
      </h2>
      <form onSubmit={e => handleSubmit(e)} className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="flex gap-5 w-full">
          <RoundInput label='Nombre(s)' name='firstName' type='text'
            icon={<BsFillPersonVcardFill className="fill-gray-500 text-xl" />} />

          <RoundInput label='Apellido(s)' name='lastName' type='text'
            icon={<BsFillPersonVcardFill className="fill-gray-500 text-xl" />} />
        </div>
        <RoundInput label='Correo electrónico' name='email' type='email'
          icon={<MdAttachEmail className="fill-gray-500 text-xl" />} />
        
        <RoundInput label='Contraseña' name='password' type='password'
          icon={<BsFillEyeFill className="fill-gray-500 text-xl" />} />

        {fieldErrs.length > 0 && <div className="w-full font-semibold text-sm text-rose-600 flex items-start">
          <p>Los siguientes campos no pueden estar en blanco: {errNames}.</p>
        </div>}
        
        <button type="submit" disabled={registerMutation.isLoading}
          className="disabled:opacity-60 rounded-full bg-blue-400 px-24 py-3 hover:bg-blue-300 text-white font-medium">
          Registrarme
        </button>

        
        {registerMutation.isError  && <div className="w-full font-semibold text-sm text-rose-600 flex items-start">
          <p>Hubo un error, intenta de nuevo en unos momentos...</p>
        </div>}
      </form>
    </div>
  )
};

export default RegisterForm;
