
import { faker } from '@faker-js/faker'
import { useEffect, useState, useCallback } from 'react'

const generativeWords = ({ count }: { count: number }) => {
    return faker.word.words(count).toLowerCase();
}

const useWords = (count: number) => {
    const [words, setWords] = useState<string>("");

    const updateWords = useCallback(() => {
        setWords(generativeWords({ count }));
    }, [count]);

    useEffect(() => {
        // Ensure that this code only runs on the client-side
        updateWords();
    }, [updateWords]);

    return { words, updateWords };
}

export default useWords;
