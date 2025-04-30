import styles from "../styles/MoodInput.module.scss";

type MoodInputProps = {
	mood: string;
	setMood: (value: string) => void;
	onMoodChange: (value: string) => void;
};

function MoodInput({ mood, setMood, onMoodChange }: MoodInputProps) {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
		}
	};

	const handleClick = (mood: string) => {
		onMoodChange(mood);
		setMood(mood);
	};

	return (
		<div>
			<label className={styles.moodinput_label}>Or fill in mood:</label>
			<input
				className={styles.moodinput_input}
				type="text"
				value={mood}
				onChange={(e) => handleClick(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
		</div>
	);
}

export default MoodInput;
