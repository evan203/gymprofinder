import Head from "next/head";


export default function Home() {

  return (
    <>
      <Head>
        <title>GymProFinder</title>
        <meta name="description" content="GymProFinder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#870000] to-[#250000]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            What is Gym <span className="text-[#ff3333]">Pro</span> Finder?
          </h1>
          <h3 className="text-2xl text-white font-bold">Our Mission →</h3>
          <div className="text-lg text-white">
At GymBro Finder, we are dedicated to helping people find the motivation and discipline they need in the gym. Our commitment to our community is to help them lead healthier lives.

We achieve this by partnering up with local gyms to offer discounted gym memberships and by connecting you with a compatible gym partner, who can offer the support and accountability you need to stay motivated and improve your workout journey.

With GymBro Finder, you can take your fitness to the next level and create a more fulfilling workout experience.
          </div>
        </div>
      </main>
    </>
  );
}
