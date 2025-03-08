// import { getSession } from "@/lib/session";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProfileForm from "./profile-form";

export const metadata: Metadata = {
  title: "Profile",
};

const Profile = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/admin/login");
  console.log("session", session);

  return (
    <div className="w-full max-w-md mx-auto">
      <ProfileForm />
    </div>
  );
};

export default Profile;
