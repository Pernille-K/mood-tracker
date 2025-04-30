import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TagSelector from "../../components/TagSelector";
import TagForm from "../../components/TagForm";
import styles from "../../styles/RegisterMood.module.scss";

function TagPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const mood = location.state?.mood ?? "";
	const [tag, setTag] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [availableTags, setAvailableTags] = useState<string[]>([]);
	const [message, setMessage] = useState("");
	const [hasSaved, setHasSaved] = useState(false);

	const MAX_TAGS = 6;

	useEffect(() => {
		document.body.style.backgroundColor = "#dcabfe";
		return () => {
			document.body.style.backgroundColor = "";
		};
	}, []);

	useEffect(() => {
		if (!mood) navigate("/register/mood");
	}, [mood]);

	useEffect(() => {
		const fetchTags = async () => {
			const response = await fetch("/api/last-tags");
			const data = await response.json();
			const tagValues = data.map((tagObj: { tag: string }) => tagObj.tag);
			setAvailableTags(tagValues);
		};

		fetchTags();
	}, []);

	const addTag = (newTag: string) => {
		if (!selectedTags.includes(newTag)) setSelectedTags([...selectedTags, newTag]);
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

	const handleSave = async () => {
		try {
			const moodResponse = await fetch("/api/moods", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ mood }),
			});
			if (!moodResponse.ok) throw new Error("Could not save mood");

			for (const tag of selectedTags) {
				const tagResponse = await fetch("/api/mood_tags", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ mood, tag }),
				});
				if (!tagResponse.ok) throw new Error("Could not save tag");
			}

			setMessage("Mood and tags saved!");
			setSelectedTags([]);
			setHasSaved(true);
		} catch (err: any) {
			setMessage("Error: " + err.message);
		}
	};

	return (
		<div className={styles.register_container}>
			<h1
				className={styles.register_h1}
				onClick={() => navigate("/")}
			>
				<img src="/favicon-assets/pwa-512x512.png"></img>Register tag
			</h1>{" "}
			{hasSaved ? (
				<>
					<p className={styles.register_p}>{message}</p>

					<button
						className={styles.register_btn}
						onClick={() => navigate("/register/mood")}
					>
						New mood
					</button>
				</>
			) : (
				<>
					<h2 className={styles.register_h2}>What u doin'</h2>
					<TagSelector
						onTagToggle={(tag) => {
							if (selectedTags.includes(tag)) removeTag(tag);
							else addTag(tag);
						}}
						selectedTags={selectedTags}
						availableTags={availableTags}
					/>
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
					<p className={styles.register_p}>{message}</p>
				</>
			)}
		</div>
	);
}

export default TagPage;
