import { useEffect, useState } from "react";
import { MoodTag } from "../types";

function MoodList() {
	const [moods, setMoods] = useState<MoodTag[]>([]);
	const [loading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		async function fetchMoods() {
			try {
				const response = await fetch("/api/mood_tags");

				if (!response.ok) {
					throw new Error("Something went wrong in fetching moods");
				}

				const data = await response.json();
				setMoods(data);
			} catch (error: any) {
				console.error(error);
				setErrorMessage(error.message);
			} finally {
				setIsLoading(false);
			}
		}
		fetchMoods();
	}, []);

	if (loading) return <div> 🔃 Loading moods ...</div>;

	if (errorMessage) return <div>❌ Error: {errorMessage}</div>;

	return (
		<div>
			<h2>Moods</h2>
			<ul>
				{moods.map((mood, index) => (
					<li key={index}>
						<strong>{mood.mood}</strong> - {mood.tag} ({mood.created_at})
					</li>
				))}
			</ul>
		</div>
	);
}

export default MoodList;
