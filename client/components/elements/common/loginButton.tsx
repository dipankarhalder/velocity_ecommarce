"use client";

import { useDispatch } from "react-redux";
import { openLogin } from "@/store/slices/authSlice";
import { Account } from "@/components/icons";

export const LoginButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      aria-label="Login to your account"
      type="button"
      onClick={() => dispatch(openLogin())}
    >
      <Account aria-hidden="true" focusable="false" />
      <div className="app_main_header_login_text">
        <p>Login</p>
        <em>Account</em>
      </div>
    </button>
  );
};
