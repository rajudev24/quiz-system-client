import { isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PrivateRoute = ({ children }) => {
  const userLoggedIn = isLoggedIn();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/");
    }
    setLoading(true);
  }, [router, userLoggedIn]);

  if (!isLoading) {
    return <p>Loading...</p>;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
