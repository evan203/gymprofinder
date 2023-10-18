import InfiniteScroll from 'react-infinite-scroll-component';
import Link from "next/link";
import { ProfileImage } from "./ProfileImage";
import { LoadingSpinner } from "./LoadingSpinner";

type User = {
  id: string;
  name: string | null;
  image: string | null;
  // Add more user properties as needed
};

type InfiniteUserListProps = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean | undefined;
  fetchNewUsers: () => Promise<unknown>;
  users?: User[];
};

export function InfiniteUserList({
  users,
  isLoading,
  isError,
  fetchNewUsers,
  hasMore = false,
}: InfiniteUserListProps) {
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <h1>Error...</h1>;

  if (users === undefined || users?.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-gray-500">No Users</h2>
    );
  }

  return (
    <ul>
      <InfiniteScroll
        dataLength={users.length}
        next={fetchNewUsers}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
      >
        {users.map((user) => {
          return <UserCard key={user.id} {...user} />;
        })}
      </InfiniteScroll>
    </ul>
  );
}

function UserCard({ id, name, image }: User) {
  return (
    <li className="flex gap-4 border-b px-4 py-4">
      <Link href={`/profiles/${id}`}>
        <ProfileImage src={image} />
      </Link>
      <div className="flex flex-grow flex-col">
        <div className="flex gap-1">
          <Link
            href={`/profiles/${id}`}
            className="font-bold outline-none hover:underline focus-visible:underline"
          >
            {name ?? 'Anonymous'}
          </Link>
        </div>
      </div>
    </li>
  );
}

