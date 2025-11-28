"use client";

// import { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { closeLogin, loginSuccess } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import popbg from "../../../public/popbg.jpg";

export const LoginPopup = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.auth.isLoginOpen);

  if (!isOpen) return null;

  const handleLogin = () => {
    dispatch(loginSuccess({ name: "User", email: "dipankar@gmail.com" }));
  };

  return (
    <div className="app_login_popup">
      <div className="app_inside_login_app">
        <div className="app_login_left_side">
          <h2 className="text-xl mb-4 font-semibold">Login</h2>
          <button
            className="bg-blue-600 text-white w-full py-2 rounded"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="mt-3 text-sm text-gray-600"
            onClick={() => dispatch(closeLogin())}
          >
            Close
          </button>
        </div>
        <div className="app_login_right_side">
          <Image
            src={popbg}
            alt={"pop background"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};
