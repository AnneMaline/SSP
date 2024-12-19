"use client";
import { useSession, signIn, signOut } from "next-auth/react";

const Authentication = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div>
        <p className="text-small  text-black">Welcome, {session.user?.name}</p>
        <button className="button" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="text-small text-black">
      <button className="button" onClick={() => signIn("azure-ad")}>
        Sign in with Azure AD
      </button>
    </div>
  );
};

export default Authentication;
