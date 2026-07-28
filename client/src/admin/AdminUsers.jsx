import {useEffect,useState} from "react";
import API from "../services/api";

function AdminUsers(){

  const [users,setUsers]=useState([]);


  const fetchUsers=async()=>{

    try{

      const response=await API.get("/users");

      setUsers(response.data);

    }catch(error){

      console.log(error);

    }

  };


  useEffect(()=>{

    fetchUsers();

  },[]);



  return(

    <div className="
      min-h-screen
      bg-[#020617]
      p-6
    ">


      <h1 className="
        text-3xl
        font-bold
        text-cyan-400
        mb-8
      ">
        User Management
      </h1>



      <div className="grid gap-5">


      {
        users.map(user=>(

          <div
            key={user._id}
            className="
              bg-[#111827]
              border
              border-cyan-400/20
              rounded-xl
              p-5
            "
          >


            <h2 className="text-xl text-white font-bold">

              {user.name}

            </h2>


            <p className="text-gray-400 mt-2">

              Email:
              {" "}
              {user.email}

            </p>


            <p className="text-cyan-400 mt-2">

              Role:
              {" "}
              {user.role}

            </p>


            <p className="text-gray-500 text-sm mt-2">

              Joined:
              {" "}
              {new Date(user.createdAt).toLocaleDateString()}

            </p>


          </div>


        ))
      }


      </div>


    </div>

  );

}


export default AdminUsers;