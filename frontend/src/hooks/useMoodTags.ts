import { useEffect, useState } from "react";
import { MoodTag } from "../types";

export function useMoodTags() {
	const [data, setData] = useState<MoodTag[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("http://localhost:3000/api/mood_tags")
			.then((res) => res.json())
			.then((json) => {
				setData(json);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Wrong with fetching mood_tags:", err);
				setLoading(false);
			});
	}, []);

	return { data, loading };
}
