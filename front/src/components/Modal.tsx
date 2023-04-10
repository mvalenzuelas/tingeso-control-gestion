import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  isVisible: boolean;
}

const Modal = ({ children, isVisible }: ModalProps) => {
  if (!isVisible) return null;
  
  return (
    <div className="absolute left-0 top-0 w-screen h-screen bg-slate-400 bg-opacity-50 flex items-center justify-center">
        { children }
    </div>
  )
};

export default Modal;
