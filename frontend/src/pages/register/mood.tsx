import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MoodSelector from "../../components/MoodSelector";
import MoodInput from "../../components/MoodInput";
import styles from "../../styles/RegisterMood.module.scss";

function MoodPage() {
	const [mood, setMood] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		document.body.style.backgroundColor = "#dcabfe";
		return () => {
			document.body.style.backgroundColor = "";
		};
	}, []);

	const handleMoodChange = (selectedMood: string) => {
		if (mood === selectedMood) setMood("");
		else setMood(selectedMood);
	};

	const handleGoToTags = () => {
		if (!mood.trim()) return;
		navigate("/register/tags", { state: { mood } });
	};

	return (
		<div className={styles.register_container}>
			<h1
				className={styles.register_h1}
				onClick={() => navigate("/")}
			>
				<img src="/favicon-assets/pwa-512x512.png"></img>Register mood
			</h1>{" "}
			<h2 className={styles.register_h2}>How u feelin'</h2>
			<MoodSelector
				mood={mood}
				setMood={setMood}
				onMoodChange={handleMoodChange}
			/>
			<MoodInput
				mood={mood}
				setMood={setMood}
				onMoodChange={handleMoodChange}
			/>
			<button
				className={styles.register_btn}
				onClick={handleGoToTags}
				disabled={!mood}
			>
				Save mood
			</button>
		</div>
	);
}

export default MoodPage;
