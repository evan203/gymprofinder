import { useSession } from "next-auth/react";
import Head from "next/head";
import { InfiniteUserList } from "~/components/InfiniteUserList";
import { LoggedOutLanding } from "~/components/LoggedOutLanding";
import { api } from "~/utils/api";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WorkoutAddButton from "~/components/WorkoutAddButton";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function LoggedInHome() {
    const [startDate, setStartDate] = useState<Date>(new Date());
  return (
    <>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#870000] to-[#250000]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Gym <span className="text-[#ff3333]">Pro</span> Finder
          </h1>
          <div className = "text-white text-4l">
            <p>Select the date of the workout</p>
            <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
          </div>
          <div>
            <WorkoutAddButton />
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
