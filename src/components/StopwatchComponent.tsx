'use client'

import { JSX } from "react";
import { useStopwatch } from "@/hooks/useStopwatch"

export function StopwatchComponent(): JSX.Element {
	const stopwatch = useStopwatch();

	function handleStart() {
		console.log('start');
		stopwatch.start();
	}

	function handleStop() {
		stopwatch.stop();
	}

	function handleReset() {
		stopwatch.reset();
	}

	return (
		<div>
			<span>{stopwatch.currentTimeFormatted()}</span>
			<div>
				<button onClick={handleStart}>Start</button>
				<button onClick={handleStop}>Stop</button>
				<button onClick={handleReset}>Reset</button>
			</div>
		</div>
	)
}
