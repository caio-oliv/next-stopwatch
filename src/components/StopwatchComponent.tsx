import { useStopwatch } from "@/hooks/useStopwatch"


export function StopwatchComponent(): JSX.Element {
	const stopW = useStopwatch();

	return (
		<div>
			<span>{}</span>
			<div>
				<button onClick={}>Start</button>
				<button onClick={}>Stop</button>
				<button onClick={}>Reset</button>
			</div>
		</div>
	)
}
