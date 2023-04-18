import { getCookie } from "cookies-next";
const jwt = require("jsonwebtoken");
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const MyAccount = () => {
  const token = getCookie("user");
  const [user, setuser] = useState();
  useEffect(() => {
    setuser(jwt.verify(JSON.parse(token).token, "POKEMONAWESOME"));
  }, []);
//   console.log();
  return (
    <div className="text-2xl text-red-500">
      HII {user.user.fName} we are working on this section
    </div>
  );
};

export default MyAccount;
