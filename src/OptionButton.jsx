function OptionButton({option , handlePlay, disabled}){
    return(
      <button 
              className='px-4 py-2 m-2 text-xl font-bold text-white bg-purple-500 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed'
              key={option.id}
              disabled={disabled}
              onClick={() => handlePlay(option.id)}
              title={option.name}
            >
              {option.emoji}
            </button>
    )
  }