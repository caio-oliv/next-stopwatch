import { useEffect, useState } from "react";

// Tracks elapsed time in seconds.
// Provides functions to start, stop, and reset the stopwatch.
// Returns the current time in seconds and a formatted minutes:seconds string.

export interface UseStopwatchReturn {
	start(): void;
	stop(): void;
	reset(): void;
	/**
	 * Returns the current time in seconds
	 */
	currentTime(): number;
	currentTimeFormatted(): string;
}

const HALF_SECOND_IN_MILLIS: number = 500;

export function useStopwatch(): UseStopwatchReturn {
	const [time, setTime] = useState<number>(0);
	const [playTimestamp, setPlayTimestamp] = useState<number | null>(null);

	function start() {
		setPlayTimestamp(Date.now());
	}

	function stop() {
		setPlayTimestamp(null);
	}

	function reset() {
		setTime(0);
		setPlayTimestamp(null);
	}

	function currentTime(): number {
		return time;
	}

	function currentTimeFormatted() {
		const currTime = currentTime()
		const minutes = (currTime / 60).toFixed();
		const seconds = (currTime % 60).toFixed();
		return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
	}

	useEffect(() => {
		const interv = setInterval(() => {
			if (playTimestamp === null) {
				return;
			}

			setTime(() => {
				const elapse = Date.now() - playTimestamp;
				return elapse / 1000;
			});
		}, HALF_SECOND_IN_MILLIS)

		return () => clearInterval(interv);
	}, [playTimestamp]);

	return {
		currentTime,
		currentTimeFormatted,
		reset,
		start,
		stop
	}
}

