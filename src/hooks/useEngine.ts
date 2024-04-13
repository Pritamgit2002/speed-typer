
"use client"
import { useCallback, useEffect, useState } from 'react';
import useWords from './useWords';
import useCountdownTimer from './useCountdownTimer';
import useTypings from './useTypings';
import { countErrors } from '@/utils/helpers';

export type State = "start" | "stop" | "finish";
const NUMBER_OF_WORDS = 12;
const COUNTDOWN_SECONDS = 30;
const useEngine = () => {
    const [state, setState] = useState<State>("start");

    // Ensure that this code runs only on the client-side
    const { timeLeft, startCountdown, resetCountdown } = useCountdownTimer(COUNTDOWN_SECONDS);
    const { words, updateWords } = useWords(NUMBER_OF_WORDS);
    const { typed,
        cursor,
        clearTyped,
        resetTotalTyped,
        totalTyped } = useTypings(state !== "finish")
    const [errors, setErrors] = useState(0);

    const isStarting = state === "start" || cursor > 0;
    const areWordsFinished = cursor === words.length;

    const sumErrors = useCallback(() => {
        const wordsReached = words.substring(0, cursor);
        setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached))
    }, [typed, words, cursor])

    //as soon as typing start start the countdown

    useEffect(() => {
        if (isStarting) {
            setState("run" as State);

            startCountdown();
        }
    }, [isStarting, startCountdown, cursor]);

    //when the time is up, it's finished

    useEffect(() => {
        console.log("time is up...");
        setState("finish" as State);
        sumErrors();
    }, [timeLeft, sumErrors])

    // when types is filled , create new
    useEffect(() => {
        if (areWordsFinished) {
            console.log("words are finished");
            sumErrors();
            updateWords();
            clearTyped();
        }
    }, [cursor, words, clearTyped, typed, areWordsFinished, updateWords, sumErrors])

    //restart button functionality

    const restart = useCallback(() => {
        setState("start");
        resetCountdown();
        clearTyped();
        resetTotalTyped();
        setErrors(0);
        updateWords();
        clearTyped();
    }, [clearTyped, updateWords, resetCountdown, resetTotalTyped])


    if (typeof window !== 'undefined') {
        return { state, words, timeLeft, typed, errors, totalTyped, restart };
    }
    // If running on the server, return default state
    return { state, words: [], timeLeft, typed, errors, totalTyped, restart };
};

export default useEngine;
