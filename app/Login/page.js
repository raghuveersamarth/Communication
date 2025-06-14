import React from "react";

const Login = () => {
  return (
    <div>
      
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <h1 className="text-4xl font-bold text-[#fca000] mb-8">
          Login / Signup
        </h1>
        <form className="bg-[#191919] p-8 rounded-lg shadow-md w-96">
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#fca000] cursor-pointer text-white py-2 rounded hover:bg-[#ffc67b] transition duration-200"
          >
            Login
          </button>
        </form>
          <div className="activities">
            <p className="text-center text-white mt-4">
              Forgot your password?{" "}
              <a
                href="/reset-password"
                className="text-[#fca000] hover:underline"
              >
                Reset it
              </a>
            </p>
            <p className="text-center text-white mt-4">
              Don't have an account?
              <a href="/dashboard/Billing" className="text-[#fca000] hover:underline">
                Sign Up
              </a>
            </p>
          </div>
      </div>
    </div>
  );
};

export default Login;
