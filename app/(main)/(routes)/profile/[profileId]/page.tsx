import Image from "next/image";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { redirectToSignIn } from "@clerk/nextjs";
import { User } from "lucide-react";
// import { UserButton } from "@clerk/clerk-react";

interface ProfileIdPageProps {
  params: {
    profileId: string;
  }
}

const ProfileIdPage = async ({
  params,
}: ProfileIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const profileData = await db.profile.findUnique({
    where: {
      id: profile.id
    },
  });

  if (!profileData) {
    return redirect("/");
  }

  return (
    <div 
      className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
    >
        <div className="mt-20">
          <div 
            className="
              flex 
              flex-col 
              md:flex-row 
              items-center 
              gap-x-5
            "
          >
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
            <User className="w-[150px] h-[150 px]"/>
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">
                Welcome back
              </p>
              <h1 
                className="
                  text-white 
                  text-4xl 
                  sm:text-5xl 
                  lg:text-7xl 
                  font-bold
                "
              >
                {profileData.name}
              </h1>
            </div>
          </div>
        </div>
      {/* Add your profile content here */}
    </div>
  );
}

export default ProfileIdPage;