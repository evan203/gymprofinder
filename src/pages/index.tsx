import { useSession } from "next-auth/react";
import Head from "next/head";
import { InfiniteUserList } from "~/components/InfiniteUserList";
import { LoggedOutLanding } from "~/components/LoggedOutLanding";
import { api } from "~/utils/api";

function LoggedInHome() {
  const users = api.profile.infiniteFeed.useInfiniteQuery( 
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );
  return (
    <>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#870000] to-[#250000]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Gym <span className="text-[#ff3333]">Pro</span> Finder
          </h1>
          <div className="grid grid-cols-1 gap-4 md:gap-8">
              <InfiniteUserList 
                users={users.data?.pages.flatMap((page) => page.users)}
                isError={users.isError}
                isLoading={users.isLoading}
                hasMore={false}
                fetchNewUsers={users.fetchNextPage}
              />
          </div>
        </div>
      </main>



    </>
  )
}
export default function Home() {
  const session = useSession();
  return (
    <>
      <Head>
        <title>GymProFinder</title>
        <meta name="GymProFinder" content="GymProFinder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {session.status === "authenticated" ? <LoggedInHome /> : <LoggedOutLanding /> }
      </div>
    </>
  );
}
