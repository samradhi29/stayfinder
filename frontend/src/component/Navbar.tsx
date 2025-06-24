
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out");
    navigate("/login");
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0 bg-white z-50">
      <div className="flex justify-between items-center py-4 px-6 lg:px-12">
        {/* Left - Logo */}
        <div
          className="text-2xl font-extrabold text-pink-600 cursor-pointer select-none"
          onClick={() => navigate("/")}
        >
          Stayfinder
        </div>

    
        <div className="hidden md:flex gap-8 font-medium text-gray-700">
          <button className="flex items-center gap-1 border-b-2 border-black pb-1">
            🏠 Homes
          </button>
        
     
        </div>

      
        <div className="flex gap-4 items-center">
    <button
  onClick={() => {
    if (!token) {
      alert("Please login to become a host");
      navigate("/login");
    } else {
      navigate("/host/dashboard");
    }
  }}
  className="hidden md:block px-4 py-2 border border-pink-600 text-pink-600 rounded-full font-semibold hover:bg-pink-600 hover:text-white transition"
>
  Become a Host
</button>


          {!token ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 border border-pink-600 text-pink-600 rounded-full font-semibold hover:bg-pink-600 hover:text-white transition"
              >
                Register
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
   
    </div>
  );
};

export default Navbar;
