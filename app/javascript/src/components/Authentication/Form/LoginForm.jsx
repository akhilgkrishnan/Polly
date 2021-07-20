import React from "react";
import { Link } from "react-router-dom";

import Input from "components/Input";
import Button from "components/Button";

const LoginForm = ({ handleSubmit, setEmail, setPassword, loading }) => {
  return (
    <>
      <h2 className="text-3xl font-extrabold text-center text-indigo-500">
        Login
      </h2>
      <form className="mt-8" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          placeholder="oliver@example.com"
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          placeholder="********"
          onChange={e => setPassword(e.target.value)}
        />
        <div className="flex justify-center">
          <div className="mt-6">
            <Button type="submit" buttonText="Submit" loading={loading} />
          </div>
        </div>
      </form>
      <div className="flex justify-center items-center mt-2">
        <p className="text-xs">Don&apos;t have an account?</p>
        <Link to="/signup" className="text-xs font-bold underline pl-1">
          Signup
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
