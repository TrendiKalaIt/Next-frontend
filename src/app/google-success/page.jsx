"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice"; // your redux slice
import Spinner from "@/components/Spinner";

export default function GoogleSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);

      // ✅ Fetch user profile to update Redux
      axios
        .get(`${API_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(login(res.data)); // store user in Redux
          router.push("/"); // redirect to homepage
        })
        .catch((err) => {
          console.error("Error fetching user profile:", err);
          router.push("/signin");
        });
    }
  }, [searchParams, router, dispatch]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner />
      <p className="ml-3 text-gray-600">Logging you in with Google...</p>
    </div>
  );
}
