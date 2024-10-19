import { SignIn } from "@clerk/clerk-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const {userId} = auth()
    if(!userId) redirect('/sign-in') 
  return <div>{children}</div>;
};

export default AdminLayout;