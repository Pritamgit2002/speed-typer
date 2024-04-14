export const formatPercentage = (percentage: number) => {
    return percentage.toFixed(0) + "%";
}

export const countErrors = (actual: string, expected: string) => {

    const expectedCharacters = expected.split("");

    return expectedCharacters.reduce((errors, expectedChar, i) => {
        const actualChar = actual[i];
        if (actualChar !== expectedChar) {
            errors++;
        }
        return errors;
    }, 0)
}

export const calculateAccuracyPercentage = (errors: number, total: number) => {
    if (total > 0) {
        const corrects = total - errors;
        return (corrects / total) * 100;
    }
    return 0;
}

export const calculateWpm = (errors: number, total: number) => {
    if (total > 0) {
        const correctedWords = total - errors;
        return Math.floor((correctedWords / 5) * 2);
    }
    return 0;
}