import React from "react";
import { Link } from "react-router-dom";

import Input from "components/Input";
import Button from "components/Button";
const SignupForm = ({
  handleSubmit,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  loading,
  setPasswordConfirmation,
}) => {
  return (
    <>
      <h2 className="text-3xl font-extrabold text-center text-indigo-500">
        Sign Up
      </h2>
      <form className="mt-8" onSubmit={handleSubmit}>
        <Input
          label="First Name"
          placeholder="Oliver"
          onChange={e => setFirstName(e.target.value)}
        />
        <Input
          label="Last Name"
          placeholder="Smith"
          onChange={e => setLastName(e.target.value)}
        />
        <Input
          type="email"
          label="Email"
          placeholder="oliver@example.com"
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="Password"
          placeholder="********"
          onChange={e => setPassword(e.target.value)}
        />
        <Input
          type="password"
          label="Password Confirmation"
          placeholder="********"
          onChange={e => setPasswordConfirmation(e.target.value)}
        />
        <div className="flex justify-center">
          <div className="mt-6">
            <Button type="submit" buttonText="Submit" loading={loading} />
          </div>
        </div>
      </form>
      <div className="flex justify-center items-center mt-2">
        <p className="text-xs">Already have an account? </p>
        <Link to="/" className="text-xs font-bold underline pl-1">
          Login
        </Link>
      </div>
    </>
  );
};

export default SignupForm;
