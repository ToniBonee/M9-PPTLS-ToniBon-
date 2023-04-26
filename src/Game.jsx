import { useState, useEffect } from 'react'

const options = [
  {id: 0, name: "Piedra", emoji: "🗿", beats: [2, 3]},
  {id: 1, name: "Papel", emoji: "🧻", beats: [0, 4]},
  {id: 2, name: "Tijera", emoji: "✂", beats: [1, 3]},
  {id: 3, name: "Lagarto", emoji: "🦎", beats: [1, 4]},
  {id: 4, name: "Spock", emoji: "🖖", beats: [2, 0]},
];

const getResult = (userEleccion, opcionOrdenador) =>{
  if (userEleccion == opcionOrdenador){
    return 0;
  }
  if(options[userEleccion].beats.includes(opcionOrdenador)){
    return 1;
  }
  return 2;
}

export default function Game() {
 const [userEleccion,setUserEleccion]= useState(null);
 const [opcionOrdenador,setOpcionOrdenador] = useState(null);
 const [UserMessage, setUserMessage]= useState(null);
 const [ComputerMessage, setComputerMessage]= useState(null);
 const [result, setResult]= useState(null);
 const [disabled, setDisabled]= useState(false);

  useEffect(() => {
    if(userEleccion != null){
      setUserMessage(`Has elegido ${options[userEleccion]?.emoji} - ${options[userEleccion]?.name}`);
    }
  }, [userEleccion])

  useEffect(() => {
    if(opcionOrdenador != null){
      setComputerMessage(`El ordenador ha elegido ${options[opcionOrdenador]?.emoji} - ${options[opcionOrdenador]?.name}`);
    }
  }, [opcionOrdenador])

 const handlePlay = (eleccion) => {
  setUserEleccion(eleccion);
  setDisabled(true);
  const randomEleccion = Math.floor(Math.random() * 5);

  setTimeout(() => {
    setOpcionOrdenador(randomEleccion);
  }, 1500);

  setTimeout(() => {
    setResult(getResult(eleccion, randomEleccion));
  }, 3000);

  clearTimeout();
 };

 const reset = () => {
  setUserEleccion(null);
  setDisabled(false);
  setOpcionOrdenador(null);
  setUserMessage(null);
  setResult(null);
  setComputerMessage(null);
 }
  return( 
  <div className='flex items-center justify-center h-screen bg-gray-800'>
    <div className='rounded-lg p-4 bg-gray-500'>
      <h1 className='text-3x1 mb-4 text-center font-bold'>¿Te atreves a jugar?</h1>
      <div className='max-w-md mx-auto'>
        {options.map(option => (
          <button 
            className='px-4 py-2 m-2 text-xl font-bold text-white bg-purple-500 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed'
            key={option.id}
            disabled={disabled}
            onClick={() => handlePlay(option.id)}
            title={option.name}
          >
            {option.emoji}
          </button>
        ))}
        {userEleccion != null && (
          <p className='text-xl mt-4'>{UserMessage}</p>
        )}
         {opcionOrdenador != null && (
          <p className='text-xl mt-4'>{ComputerMessage}</p>
        )}
        {result != null && (
          <div className='mt-8'>
            {result == 0 &&<p className='text-xl mt-4'>🤷‍♀️ Empate</p>}
            {result == 1 &&(
              <p className='text-xl mt-4'>
              ✔ Has ganado con {options[userEleccion]?.name} contra{" "}
              {options[opcionOrdenador]?.name}
              </p>
            )}
            {result == 2 &&(
              <p className='text-xl mt-4'>
              ❌ Has perdido con {options[userEleccion]?.name} contra{" "}
              {options[opcionOrdenador]?.name}
              </p>
            )}
            <button 
              className='bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-4 mt-3 rounded '
              onClick={reset}
            >
              Jugar de nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}

