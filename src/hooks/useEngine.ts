import { useCallback, useEffect, useState } from "react";

import useTypings from "./useTypings";
import useWords from "./useWords";
import useCountdownTimer from "./useCountdownTimer";
import { countErrors } from "@/utils/helpers";

export type State = "start" | "run" | "finish";

//const NUMBER_OF_WORDS = 30;
//const COUNTDOWN_SECONDS = 30;

const useEngine = () => {

    const [state, setState] = useState<State>("start");
    const [word, setWords] = useState<number>(15);
    const [time, setTime] = useState<number>(30);
    //const { timeLeft, startCountdown, resetCountdown } = useCountdownTimer(COUNTDOWN_SECONDS);
    const { timeLeft, startCountdown, resetCountdown } = useCountdownTimer(time);
    //const { words, updateWords } = useWords(NUMBER_OF_WORDS);
    const { words, updateWords } = useWords(word);
    const { cursor, typed, clearTyped, totalTyped, resetTotalTyped, typedStart, isSetTypedStart } = useTypings(state !== "finish");
    const [errors, setErrors] = useState(0);

    const isStarting = state === "start" && cursor > 0;
    const areWordsFinished = cursor === words.length;

    const restart = useCallback(() => {
        resetCountdown();
        resetTotalTyped();
        setState("start");
        setErrors(0);
        updateWords();
        clearTyped();
        isSetTypedStart(false);
    }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

    const sumErrors = useCallback(() => {
        const wordsReached = words.substring(0, Math.min(cursor, words.length));
        setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
    }, [typed, words, cursor]);

    // as soon the user starts typing the first letter, we start
    useEffect(() => {
        if (isStarting) {
            setState("run");
            startCountdown();
            isSetTypedStart(true);
        }
    }, [isStarting, startCountdown]);

    // when the time is up, we've finished
    useEffect(() => {
        if (!timeLeft && state === "run") {
            setState("finish");
            sumErrors();
            isSetTypedStart(false);
        }
    }, [timeLeft, state, sumErrors]);

    /**
     * when the current words are all filled up,
     * we generate and show another set of words
     */
    useEffect(() => {
        if (areWordsFinished) {
            sumErrors();
            updateWords();
            clearTyped();
        }
    }, [clearTyped, areWordsFinished, updateWords, sumErrors]);

    return {
        state, words, typed, errors, restart, timeLeft, setWords, setTime, totalTyped, typedStart, isSetTypedStart

    };
};

export default useEngine;