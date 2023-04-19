import { useState } from "react";
import Layout from "../../Layouts/layout";
import Router from "next/router";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitForm = async (e) => {
    await fetch(`/api/register`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await Router.push("/login")
    setEmail("")
    setName("")
    setPassword("")
  };
  return (
    <>
      <Layout>
        <div>
          <h1 className="h3 mb-3 fw-normal">Please Register</h1>
          <input
            value={name}
            className="form-control"
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Name"
            required
          />
          <input
            value={email}
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-control"
            placeholder="name@example.com"
            required
          />
          <input
            value={password}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control"
            placeholder="Password"
            required
          />

          <button className="w-100 btn btn-lg btn-primary" onClick={submitForm}>
            Register
          </button>
        </div>
      </Layout>
    </>
  );
}
