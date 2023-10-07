import Head from "next/head";
import { InfiniteUserList } from "~/components/InfiniteUserList";
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
  return (
    <>
      <Head>
        <title>GymProFinder</title>
        <meta name="GymProFinder" content="GymProFinder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Users />
      </div>
    </>
  );
}
