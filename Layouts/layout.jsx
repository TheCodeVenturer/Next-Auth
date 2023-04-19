import Head from "next/head";
import Link from "next/link";
import { signOut } from "next-auth/react";
export default function Layout({ children }) {
  const handleSignout = (e)=>{
    e.preventDefault();
    signOut();
  }
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
          crossorigin="anonymous"
        />
      </Head>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            Home
          </Link>
          <div>
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link className="nav-link active"href="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active"href="/register">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="form-signin" style={{marginTop:"50px"}}>{children}</main>
      <button onClick={handleSignout}>SignOut</button>
    </>
  );
}
