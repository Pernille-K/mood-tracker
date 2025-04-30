import { useState, useEffect } from "react";
import styles from "../styles/MoodSelector.module.scss";

type MoodSelectorProps = {
	mood: string;
	setMood: (value: string) => void;
	onMoodChange: (value: string) => void;
};

function MoodSelector({ mood, setMood, onMoodChange }: MoodSelectorProps) {
	const [moods, setMoods] = useState<{ id: number; mood: string }[]>([]);

	useEffect(() => {
		const fetchMoods = async () => {
			const response = await fetch("/api/last-moods");
			const data = await response.json();
			setMoods(data);
		};

		fetchMoods();
	}, []);

	const handleClick = (mood: string) => {
		setMood(mood);
		onMoodChange(mood);
	};

	return (
		<div className={styles.moodselector_gridBtns}>
			{moods.map((lastMood) => (
				<button
					key={lastMood.id}
					onClick={() => handleClick(lastMood.mood)}
					className={
						mood === lastMood.mood
							? `${styles.moodselector_btn} ${styles.moodselector_btn_selected}`
							: styles.moodselector_btn
					}
				>
					{lastMood.mood}
				</button>
			))}
		</div>
	);
}

export default MoodSelector;
