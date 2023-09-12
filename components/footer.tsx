import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full py-4 flex justify-center items-center">
      <Link href="https://github.com/pauseplayrepeat/community" className="text-zinc-500">
        <GithubIcon className="mr-2 text-zinc-500" />
            Github
      </Link>
    </footer>
  );
};