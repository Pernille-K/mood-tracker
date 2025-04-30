import { useState, useEffect } from "react";
import MoodSelector from "../components/MoodSelector";
import TagSelector from "../components/TagSelector";
import MoodInput from "../components/MoodInput";
import TagForm from "../components/TagForm";
import styles from "../styles/RegisterMood.module.scss";

const RegisterMood = () => {
	const [mood, setMood] = useState<string>("");
	const [tag, setTag] = useState<string>("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [availableTags, setAvailableTags] = useState<string[]>([]);
	const [message, setMessage] = useState("");
	const [hasSaved, setHasSaved] = useState(false);
	const [hasMoodSaved, setHasMoodSaved] = useState(false);

	const MAX_TAGS = 6;

	useEffect(() => {
		document.body.style.backgroundColor = "#dcabfe";
		return () => {
			document.body.style.backgroundColor = "";
		};
	}, []);

	useEffect(() => {
		const fetchTags = async () => {
			const response = await fetch("/api/last-tags");
			const data = await response.json();
			const tagValues = data.map((tagObj: { tag: string }) => tagObj.tag);
			setAvailableTags(tagValues);
			console.log(availableTags);
		};

		fetchTags();
	}, []);

	const addTag = (newTag: string) => {
		if (!selectedTags.includes(newTag)) {
			const updatedSelected = [...selectedTags, newTag];
			setSelectedTags(updatedSelected);
		}

		if (!availableTags.includes(newTag)) {
			let updatedAvailable = [newTag, ...availableTags];
			if (updatedAvailable.length > MAX_TAGS) {
				updatedAvailable = updatedAvailable.slice(0, MAX_TAGS);
			}
			setAvailableTags(updatedAvailable);
		}
	};

	const removeTag = (tagToRemove: string) => {
		setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
	};

	const handleMoodChange = (selectedMood: string) => {
		if (mood === selectedMood) {
			setMood("");
		} else {
			setMood(selectedMood);
		}
	};

	const handleMoodSave = () => {
		setHasMoodSaved(true);
	};

	const handleSave = async () => {
		if (!mood.trim()) {
			setMessage("Please select a mood");
			return;
		}

		try {
			const moodResponse = await fetch("/api/moods", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ mood }),
			});

			if (!moodResponse.ok) {
				throw new Error("Couldnt save mood");
			}

			for (const tag of selectedTags) {
				const tagResponse = await fetch("/api/mood_tags", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ mood, tag }),
				});

				if (!tagResponse.ok) {
					throw new Error("Couldnt save tag");
				}
			}
			setMessage("Mood and tags saved!");
			setMood(mood);
			setSelectedTags([]);
			setHasSaved(true);
			setHasMoodSaved(true);
		} catch (err: any) {
			setMessage("Error: " + err.message);
		}
	};

	const handleNewMood = () => {
		setMood("");
		setSelectedTags([]);
		setMessage("");
		setHasSaved(false);
		setHasMoodSaved(false);
	};

	return (
		<div className={styles.register_container}>
			<h1 className={styles.register_h1}>
				<img src="/favicon-assets/pwa-512x512.png"></img>Register mood
			</h1>

			{!hasMoodSaved && (
				<>
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
						onClick={handleMoodSave}
						disabled={!mood}
					>
						Save mood
					</button>
				</>
			)}

			{hasMoodSaved && !hasSaved && (
				<>
					<h2 className={styles.register_h2}>What u doin'</h2>
					<div className={styles.register_gridBtns}>
						<TagSelector
							onTagToggle={(tag) => {
								if (selectedTags.includes(tag)) {
									removeTag(tag);
								} else {
									addTag(tag);
								}
							}}
							selectedTags={selectedTags}
							availableTags={availableTags}
						/>
					</div>

					<TagForm
						tag={tag}
						onAddTag={(newTag) => {
							addTag(newTag);
							setTag("");
						}}
					/>
					<h3 className={styles.register_h3}>
						<strong style={{ fontWeight: "600" }}>Selected mood:</strong> {mood}
					</h3>
					<button
						className={styles.register_btn}
						onClick={handleSave}
					>
						Save mood & tags
					</button>
				</>
			)}

			<p className={styles.register_p}>{message}</p>

			{hasSaved && (
				<button
					className={styles.register_btn}
					onClick={handleNewMood}
				>
					New mood
				</button>
			)}
		</div>
	);
};

export default RegisterMood;
