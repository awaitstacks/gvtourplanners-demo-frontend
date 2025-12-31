// components/Login.jsx or src/pages/Login.jsx
import React, { useContext, useEffect, useState } from "react";
import { TourAppContext } from "../context/TourAppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(TourAppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Account created successfully!");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Logged in successfully!");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/google-signin",
        {
          idToken: response.credential,
        }
      );

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Logged in with Google!");
        navigate("/");
      } else {
        toast.error(data.message || "Google login failed");
      }
    } catch (error) {
      toast.error("Google login failed. Please try again.");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg bg-white">
        <p className="text-2xl font-semibold">
          {state === "Sign up" ? "Create Account" : "Login"}
        </p>
        <p>Please {state === "Sign up" ? "sign up" : "log in"} to continue</p>

        {state === "Sign up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-3 rounded-md text-base font-medium hover:opacity-90 transition"
        >
          {state === "Sign up" ? "Create Account" : "Login"}
        </button>

        {/* Google Login */}
        <div className="w-full flex flex-col gap-4 mt-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google Login Failed")}
              useOneTap={false}
              width="340"
              theme="outline"
              size="large"
              text="continue_with"
              shape="rectangular"
            />
          </div>
        </div>

        {/* Toggle */}
        <p className="text-center w-full mt-6 text-sm">
          {state === "Sign up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-primary underline cursor-pointer font-medium"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              New here?{" "}
              <span
                onClick={() => setState("Sign up")}
                className="text-primary underline cursor-pointer font-medium"
              >
                Create account
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;
