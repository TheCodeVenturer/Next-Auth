import { useState } from "react";
import Layout from "../../Layouts/layout";
import Router from "next/router";
import {useSession,signIn} from "next-auth/react"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {data:session,status} = useSession();
  const submitForm = async (e) => {
    const payload = {email,password}
    await signIn("credentials",{...payload})
    setEmail("");
    setPassword("");
    Router.push("/")
  };
  const signInWithGithub = async(e) =>{
    e.preventDefault()
    await signIn("github")
  }
  
  return (
    <Layout>
      <div>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <input
          value={email}
          type="email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
          placeholder="Password"
          required
        />

        <button className="w-100 btn btn-lg btn-primary" onClick={submitForm}>
          Sign in
        </button>
      </div>
      <button onClick={signInWithGithub}>signIn with Github</button>
    </Layout>
  );
}
