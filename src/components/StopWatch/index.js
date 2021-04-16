import React, { useState, useRef } from 'react';
import { Button, Container } from 'semantic-ui-react';

const formatTime = (timer) => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

const useTimer = (initialState = 0) => {
    const [timer, setTimer] = useState(initialState);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const countRef = useRef(null);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(true);
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000);
    };

    const handlePause = () => {
        clearInterval(countRef.current);
        setIsPaused(false);
    };

    const handleResume = () => {
        setIsPaused(true);
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000);
    };

    const handleReset = () => {
        clearInterval(countRef.current);
        setIsActive(false);
        setIsPaused(false);
        setTimer(0);
    };

    return {
        timer,
        isActive,
        isPaused,
        handleStart,
        handlePause,
        handleResume,
        handleReset,
    };
};

export default function StopWatch() {
    const {
        timer,
        isActive,
        isPaused,
        handleStart,
        handlePause,
        handleResume,
        handleReset,
    } = useTimer(0);

    return (
        <Container>
            <p>{formatTime(timer)}</p>
            <div>
                {!isActive && !isPaused ? (
                    <Button primary size="small" onClick={handleStart}>
                        Start
                    </Button>
                ) : isPaused ? (
                    <Button primary size="small" onClick={handlePause}>
                        Pause
                    </Button>
                ) : (
                    <Button primary size="small" onClick={handleResume}>
                        Resume
                    </Button>
                )}
                <Button
                    primary
                    size="small"
                    onClick={handleReset}
                    disabled={!isActive}
                >
                    Reset
                </Button>
            </div>
        </Container>
    );
}
