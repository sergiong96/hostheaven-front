import { useEffect, useState } from "react";
import './_CountDownTimer.scss';

function CountDownTimer() {

    const [counter, setCounter] = useState<number>(66666666);

    useEffect(() => {
        let timer: NodeJS.Timer | undefined;
        if (counter > 0) {
            timer = setInterval(() => setCounter(counter - 1000), 1000);
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        }

    }, [counter]);


    return (
        <div id="header-timer">Tiempo restante: <span>{formatDate(counter)}</span></div>
    );
}


function formatDate(time: number): string {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}


export default CountDownTimer;