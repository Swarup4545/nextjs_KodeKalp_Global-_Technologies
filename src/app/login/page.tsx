"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

const Login: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/login", user);
      console.log("Login successful:", response.data.token);
      router.push("/profile");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, [user]);

  return (
    <>
      <div className="bg-slate-400 h-screen">
        <h1 className="text-center text-4xl font-bold pt-20 pb-20">Login</h1>
        <div className="bg-white text-center">
          {error && (
            <p className="rounded m-2 bg-red-600 p-2 text-white">
              {error}
            </p>
          )}
        </div>
        <div className="h-screen flex justify-center">
          <div className="w-[40%] h-[400px] bg-blue-400 shadow-lg rounded-lg flex justify-center">
            <div className="w-[90%] p-2">
              <label className="text-black font-bold mb-5 text-3xl">
                Email
              </label>
              <br />
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter Email"
                className="rounded mt-3 w-full mb-3 h-16 p-2"
              />
              <br />
              <label className="text-black font-bold mb-5 text-3xl">
                Password
              </label>
              <br />
              <input
                type="password"
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value })
                }
                placeholder="Enter Password"
                className="h-16 rounded mt-3 w-full mb-3 p-2"
              />
              <br />

              <button
                onClick={onLogin}
                className="mt-5 p-2 border border-gray-500 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
