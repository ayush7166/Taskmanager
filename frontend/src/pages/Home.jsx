import React from "react";
import LogoutButton from "../components/Logout";
import TaskManager from "../components/TaskManager";

function Home() {
  return (
    <>
      <TaskManager />
      
      <LogoutButton />
    </>
  );
}

export default Home;
