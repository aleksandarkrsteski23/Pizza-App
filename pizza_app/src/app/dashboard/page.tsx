import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }
  return (
    <section className="w-full h-screen flex justify-center items-center">
      Dashboard
    </section>
  );
};

export default Dashboard;
