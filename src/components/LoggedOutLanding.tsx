import { signIn, useSession } from "next-auth/react";
import Link from "next/link";


export function LoggedOutLanding() {
  const { data: sessionData } = useSession();

  if (sessionData) {
    return null;
  }

  return (
    <>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#870000] to-[#250000]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Gym <span className="text-[#ff3333]">Pro</span> Finder
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="#"
            >
              <h3 className="text-2xl font-bold">Find Your GymPro →</h3>
              <div className="text-lg">
                Need a GymBro? We got your back!
                <button
                  className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                  onClick={() => void signIn()}
                >
                  {sessionData ? "Sign out" : "Sign in"}
                </button>
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="about"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">About GymProFinder →</h3>
              <div className="text-lg">
                What is GymProFinder?
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
