'use server'

// app/page.tsx
import React from "react";
// import HomePage from "./home/page"; // Import the HomePage component
import { redirect } from "next/navigation";

const RootPage: React.FC = () => {
  return redirect('/home');
};

export default RootPage;
