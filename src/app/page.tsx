"use client";
import GeneratedWords from "@/components/GeneratedWords";
import RestartButton from "@/components/RestartButton";
import UserTypings from "@/components/UserTypings";
import Results from "@/components/results";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useEngine from "@/hooks/useEngine";
import { calculateAccuracyPercentage, calculateWpm } from "@/utils/helpers";
import React, { useState } from "react";
import resetCountdown from "@/hooks/useCountdownTimer";
import useCountdownTimer from "@/hooks/useCountdownTimer";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedWord, setClickedWord] = useState<number>();

  const handleWordClicked = (num: number) => {
    setWords(num);
    setClickedWord(num);
  };

  const {
    state,
    words,
    timeLeft,
    typed,
    errors,
    restart,
    setWords,
    setTime,
    totalTyped,
    typedStart,
  } = useEngine();

  return (
    <div className=" mx-auto flex flex-col items-center justify-center h-screen max-w-6xl relative bg-[#1A0B0C] ">
      <span className=" absolute text-sm text-slate-600 font-medium py-1 px-2 rounded-xl bg-gray-100 top-0 mx-auto cursor-default select-none ">
        {" "}
        This is still under construction...{" "}
      </span>
      <div className=" w-full  flex items-center justify-between   ">
        <CountdownTimer timeLeft={timeLeft} typedStart={typedStart} />
        <Tabs
          defaultValue="words"
          className="w-max flex items-center justify-evenly gap-6   "
        >
          <TabsList className=" py-2">
            <TabsTrigger value="words">Words</TabsTrigger>
            {/* <TabsTrigger value="times">Times</TabsTrigger> */}
          </TabsList>
          <TabsContent value="words" className="  ">
            <Button
              onClick={() => handleWordClicked(15)}
              //className={`${clickedWord === 15 ? "bg-blue-400" : ""}`}
              variant={clickedWord === 15 ? "ghost" : "default"}
            >
              15
            </Button>
            <Button
              onClick={() => handleWordClicked(30)}
              //className={`${clickedWord === 30 ? "bg-blue-400" : ""}`}
              variant={clickedWord === 30 ? "ghost" : "default"}
            >
              30
            </Button>
            <Button
              onClick={() => handleWordClicked(45)}
              //className={`${clickedWord === 45 ? "bg-blue-400" : ""}`}
              variant={clickedWord === 45 ? "ghost" : "default"}
            >
              45
            </Button>
            <Button
              onClick={() => handleWordClicked(60)}
              //className={`${clickedWord === 60 ? "bg-blue-400" : ""}`}
              variant={clickedWord === 60 ? "ghost" : "default"}
            >
              60
            </Button>
          </TabsContent>
        </Tabs>
      </div>

      <WordsContainer>
        <GeneratedWords key={words} words={words} />
        {/* User typed characters will be overlayed over the generated words */}
        <UserTypings
          className="absolute inset-0"
          words={words}
          userInput={typed}
        />
      </WordsContainer>
      <Results
        className="mt-10"
        state={state}
        errors={errors}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
        wpm={calculateWpm(errors, totalTyped)}
        onRestart={restart}
      />
      <RestartButton
        className={"mx-auto mt-10 text-slate-500"}
        onRestart={restart}
      />
    </div>
  );
}

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative text-3xl w-full max-w-6xl leading-relaxed break-all mt-16 min-h-96  ">
      {children}
    </div>
  );
};

const CountdownTimer = ({
  timeLeft,
  typedStart,
}: {
  timeLeft: number;
  typedStart: boolean;
}) => {
  return (
    <h2
      className={`text-primary-400 font-medium text-lg ${
        typedStart ? "text-red-500/95" : "text-yellow-400"
      } text-left w-full`}
    >
      Time: {timeLeft}
    </h2>
  );
};
