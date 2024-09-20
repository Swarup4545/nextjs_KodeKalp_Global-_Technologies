"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [verified, setVerified] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/signup", user);
            console.log("Signup success", response.data);
            setEmailSent(true);
            checkVerificationStatus();

        } catch (error: any) {
            console.log("Signup failed", error.message);
        } finally {
            setLoading(false);
        }
    };

    const checkVerificationStatus = async () => {
        try {
            const intervalId = setInterval(async () => {
                const userRes = await axios.post("/api/user", { email: user.email });
                const isVerified = userRes.data.data.verified;

                if (isVerified) {
                    clearInterval(intervalId);
                    setVerified(true);
                    router.push("/login");
                }
            }, 5000);

        } catch (error: unknown) {
            console.log("Failed to fetch verification status", error.message);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <>
            <div className="bg-slate-400 h-screen">
                <h1 className="text-center text-4xl font-bold pt-20 pb-20">Signup</h1>
                <div className="bg-slate-400 text-center">
                    {emailSent && !verified ? (
                        <p className="rounded m-2 bg-green-600 p-2">We&apos;ve sent you an email verification link. Please verify your email.</p>
                    ) : null}
                </div>
                <div className="h-screen flex justify-center">
                    <div className="w-[40%] h-[400px]  bg-blue-400 shadow-lg rounded-lg flex justify-center">
                        <div className="w-[90%] p-2">
                            <label className="text-black font-bold mb-5 text-3xl">Email</label><br />
                            <input
                                type="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                placeholder="Enter Email"
                                className="rounded  mt-3 w-full mb-3 h-16 p-2"
                            /><br />
                            <label className="text-black font-bold mb-5 text-3xl">Password</label><br />
                            <input
                                type="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                placeholder="Enter Password"
                                className="h-16 rounded mt-3 w-full mb-3 p-2"
                            /><br />

                            <button
                                onClick={onSignup}
                                className="mt-5 p-2 border border-gray-500 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                                disabled={buttonDisabled || loading}
                            >
                                {loading ? "Signing up..." : buttonDisabled ? "No Signup" : "Signup"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
