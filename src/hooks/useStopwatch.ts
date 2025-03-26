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
		const minutes = currTime / 60;
		const seconds = currTime % 60;
		return minutes.toString() + ':' + seconds.toString();
	}

	useEffect(() => {
		const interv = setInterval(() => {
			if (playTimestamp === null) {
				return;
			}

			setTime((prev) => {
				const elapse = Date.now() - playTimestamp;

				// TODO: fix
				return prev + elapse;
			});
		}, HALF_SECOND_IN_MILLIS)

		return () => clearInterval(interv);
	}, []);

	return {
		currentTime,
		currentTimeFormatted,
		reset,
		start,
		stop
	}
}

