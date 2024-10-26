import { getUserId } from "@/lib/actions/user.actions";
import { EUserRole } from "@/type/enum";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const getUserById = await getUserId({ userId });
  if (getUserById && getUserById.role !== EUserRole.ADMIN) redirect('/')
    return <div>{children}</div>;
};

export default AdminLayout;
