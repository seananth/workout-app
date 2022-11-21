import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { useState } from "react";

type muscle = {
  id?: number;
  name: string;
};

interface excercise {
  name: string;
  muscles: muscle[];
}

interface workout {
  day: string;
  excercises: excercise[];
}

const excercises: excercise[] = [
  {
    name: "benchpress",
    muscles: [
      { name: "pectoralis major" },
      { name: "anterior deltoid" },
      { name: "triceps" },
      { name: "biceps" },
      { name: "serratus anterior" },
    ],
  },
  {
    name: "deadlift",
    muscles: [
      { name: "hamstrings" },
      { name: "glutes" },
      { name: "back" },
      { name: "hips" },
      { name: "core" },
      { name: "trapezius" },
    ],
  },
];

const defaultWorkout: workout = {
  day: "monday",
  excercises: [
    {
      name: "Benchpress",
      muscles: [
        { name: "pectoralis major" },
        { name: "anterior deltoid" },
        { name: "triceps" },
        { name: "biceps" },
        { name: "serratus anterior" },
      ],
    },
    {
      name: "Deadlift",
      muscles: [
        { name: "hamstrings" },
        { name: "glutes" },
        { name: "back" },
        { name: "hips" },
        { name: "core" },
        { name: "trapezius" },
      ],
    },
  ],
};

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const [workoutPlan, setWorkoutPlan] = useState<workout[]>([defaultWorkout]);

  return (
    <>
      <Head>
        <title>Workout builder</title>
        <meta name="description" content="Build the perfect workout plan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {workoutPlan.map((workout) => {
          return (
            <div key={workout.day} className="rounded border shadow p-2 w-56">
              <h1 className="text-2xl font-bold text-white">{workout.day.toUpperCase()}</h1>
              <ul>
                {workout.excercises.map((excercise) => {
                  return <li key={excercise.name}>{excercise.name}</li>;
                })}
              </ul>
            </div>
          );
        })}
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
