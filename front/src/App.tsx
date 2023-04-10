import { useState } from 'react'
import Modal from './components/Modal'

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className="App">
      <button className="px-4 py-2 bg-slate-500 rounded" onClick={() => setIsModalVisible(true)}>
        Click me!
      </button>
      <Modal isVisible={isModalVisible}>
        <div className="text-black px-4 py-2 bg-slate-600 rounded w-64 h-auto">
          <p>Acá va lo q sea</p>
          <button className="px-4 py-2 bg-slate-500 rounded" onClick={() => setIsModalVisible(false)}>
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default App
