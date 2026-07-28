function AdminToast({message,type}){

  if(!message) return null;

  return(
    <div
      className={`
        fixed
        top-6
        right-6
        z-50
        px-6
        py-4
        rounded-xl
        text-white
        font-semibold
        shadow-[0_10px_30px_rgba(0,0,0,0.4)]
        transition-all
        duration-300
        ${
          type==="success"
          ?
          "bg-green-500"
          :
          "bg-red-500"
        }
      `}
    >
      {message}
    </div>
  );
}

export default AdminToast;