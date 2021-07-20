import React from 'react';
import './App.css';
import Title from './Title';
import { useEffect, useState } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";


export default function Fcomponent() {
    const [time, setTime] = useState(0);
    const [status, setStatus] = useState("stop");


    useEffect(() => {
        const unsubscribe$ = new Subject();
        interval(1000)
            .pipe(takeUntil(unsubscribe$))
            .subscribe(() => {
                if (status === "run") {
                    setTime(val => val + 1000);
                }
            });
        return () => {
            unsubscribe$.next();
            unsubscribe$.complete();
        };
    }, [status]);

    const startTimer = React.useCallback(() => {
        setStatus("run");
    }, []);

    const stopTimer = React.useCallback(() => {
        setStatus("stop");
        setTime(0);
    }, []);

    const resetTimer = React.useCallback(() => {
        setTime(0);
    }, []);

    const waitTimer = React.useCallback(() => {
        setStatus("wait");
    }, []);


    return (
        <div>
            <Title />
            <p>{new Date(time).toISOString().slice(11, 19)}</p>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
            <button onDoubleClick={waitTimer}>Wait</button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    )
}
