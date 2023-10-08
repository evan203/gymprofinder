import { useSession } from "next-auth/react";
import Head from "next/head";
import { InfiniteUserList } from "~/components/InfiniteUserList";
import { LoggedOutLanding } from "~/components/LoggedOutLanding";
import { api } from "~/utils/api";

function Users() {
  const users = api.profile.infiniteFeed.useInfiniteQuery( 
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );
  return (
    <InfiniteUserList 
      users={users.data?.pages.flatMap((page) => page.users)}
      isError={users.isError}
      isLoading={users.isLoading}
      hasMore={false}
      fetchNewUsers={users.fetchNextPage}
    />
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
        {session.status === "authenticated" ? <Users /> : <LoggedOutLanding /> }
      </div>
    </>
  );
}
