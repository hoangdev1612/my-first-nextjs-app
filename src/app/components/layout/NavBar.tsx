"use client";
import Link from "next/link";
import AuthModal from "../AuthModal";
import { useContext } from "react";
import { AuthenticationContext } from "../../../../context/AuthContext";
import useAuth from "../../../../hooks/useAuth";

export default function NavBar() {
  const { data, loading } = useContext(AuthenticationContext);
  const { signout } = useAuth();
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable{" "}
      </Link>
      <div>
        <div className="flex">
          {!loading &&
            (data ? (
              <button
                className="bg-blue-400 text-white px-4 py-2 rounded-md"
                onClick={signout}
              >
                Logout
              </button>
            ) : (
              <>
                <AuthModal isSignedIn={true} />
                <AuthModal isSignedIn={false} />
              </>
            ))}
        </div>
      </div>
    </nav>
  );
}
