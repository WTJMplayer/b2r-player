import React, { useState } from "react";
import "../App.css";
import { chakra } from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";
import LoginForm from "./forms/LoginForm";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function HeroSection() {

  return (
    <>
      <LoginForm />
    </>
  );
}

export default HeroSection;
