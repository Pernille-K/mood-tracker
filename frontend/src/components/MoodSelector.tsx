import { useState, useEffect } from "react";

function MoodSelector({ onMoodChange }: { onMoodChange: (selectedMood: string) => void }) {
	const [moods, setMoods] = useState<{ id: number; mood: string }[]>([]);

	useEffect(() => {
		const fetchMoods = async () => {
			const response = await fetch("/api/moods");
			const data = await response.json();
			setMoods(data);
		};

		fetchMoods();
	}, []);

	return (
		<div>
			<h3>Select Mood:</h3>
			<select onChange={(e) => onMoodChange(e.target.value)}>
				<option value="">--Choose a mood--</option>
				{moods.map((mood) => (
					<option
						key={mood.id}
						value={mood.mood}
					>
						{mood.mood}
					</option>
				))}
			</select>
		</div>
	);
}

export default MoodSelector;
