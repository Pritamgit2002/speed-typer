import { useCallback, useEffect, useRef, useState } from "react";

const useCountdownTimer = (seconds: number) => {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const intervalRef = useRef<NodeJS.Timer | null>(null);

    const startCountdown = useCallback(() => {
        console.log("starting countdown timer...");
        intervalRef.current = setInterval(() => {
            setTimeLeft((timeLeft) => timeLeft - 1);
        }, 1000)
    }, [setTimeLeft])

    const resetCountdown = useCallback(() => {
        console.log("resetting countdown timer...");
        if (intervalRef.current && typeof intervalRef.current === 'number') {
            clearInterval(intervalRef.current);
        }
        setTimeLeft(seconds);
    }, [seconds])
    //when the countdown reaches 0  clear the counter
    useEffect(() => {
        if (!timeLeft && intervalRef.current && typeof intervalRef.current === 'number') {
            console.log("clearing timer...")
            clearInterval(intervalRef.current);

        }
    }, [timeLeft, intervalRef])
    return { timeLeft, startCountdown, resetCountdown }
}

export default useCountdownTimer;