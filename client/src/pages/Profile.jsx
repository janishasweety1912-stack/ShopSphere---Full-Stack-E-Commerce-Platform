import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile(){

  const {user}=useContext(AuthContext);

  return(
    <div className="min-h-screen bg-[#020617] p-6">

      <div className="max-w-xl mx-auto bg-[#111827] border border-cyan-400/20 rounded-xl p-8">

        <h1 className="text-3xl font-bold text-cyan-400 mb-6">
          My Profile
        </h1>


        {
          user ? (

            <div className="text-white space-y-4">

              <p>
                <span className="text-cyan-400 font-bold">
                  Name:
                </span>
                {" "}
                {user.name}
              </p>


              <p>
                <span className="text-cyan-400 font-bold">
                  Email:
                </span>
                {" "}
                {user.email}
              </p>


              <p>
                <span className="text-cyan-400 font-bold">
                  Role:
                </span>
                {" "}
                {user.role}
              </p>


            </div>

          ):(

            <p className="text-gray-400">
              Please login first
            </p>

          )
        }


      </div>

    </div>
  );

}

export default Profile;