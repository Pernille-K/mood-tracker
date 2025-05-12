import { useEffect, useState } from "react";
import styles from "../styles/Stats.module.scss";

type MoodDropdownProps = {
	mood: string;
	onMoodChange: (value: string) => void;
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

function MoodDropdown({ mood, onMoodChange, isOpen, setIsOpen }: MoodDropdownProps) {
	const [moods, setMoods] = useState<string[]>([]);

	useEffect(() => {
		const fetchMoods = async () => {
			const response = await fetch("/api/mood_tags");
			const data: { mood: string }[] = await response.json();
			const uniqueMoods = Array.from(new Set(data.map((entry) => entry.mood))).sort();
			setMoods(uniqueMoods);
		};

		fetchMoods();
	}, []);

	return (
		<div className={styles.stats_dropdown}>
			<h3 className={styles.stats_h3}>
				{" "}
				When you're{" "}
				<span className={styles.stats_dropdown}>
					<span
						className={styles.stats_dropbtn}
						onClick={() => setIsOpen(!isOpen)}
					>
						{mood.toLowerCase()}
					</span>

					{isOpen && (
						<div
							className={`${styles.stats_dropdown_content} ${moods.length > 10 ? styles.multi_column : ""}`}
						>
							{moods
								.filter((moodItem) => moodItem !== mood)
								.map((moodItem, index) => (
									<a
										key={index}
										onClick={() => {
											onMoodChange(moodItem);
											setIsOpen(false);
										}}
									>
										{moodItem.toLowerCase()}
									</a>
								))}
						</div>
					)}
				</span>{" "}
				it's because you're ...
			</h3>
		</div>
	);
}

export default MoodDropdown;
