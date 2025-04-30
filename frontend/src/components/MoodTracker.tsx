import { useState } from "react";
import MoodSelector from "./MoodSelector";

function MoodTracker() {
	const [mood, setMood] = useState<string>("");
	const [moodId, setMoodId] = useState<number | null>(null);
	const [tag, setTag] = useState("");
	const [tags, setTags] = useState<string[]>([]);
	const [message, setMessage] = useState("");

	const handleMoodChange = (selectedMood: string) => {
		setMood(selectedMood);
		setMoodId(null);
	};

	async function handleMoodSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (!mood.trim()) {
			setMessage("Mood cannot be empty!");
			return;
		}

		try {
			const response = await fetch("/api/moods", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ mood }),
			});

			if (!response.ok) {
				throw new Error("Couldnt save mood");
			}

			const data = await response.json();
			setMoodId(data.id);

			setMessage("Mood saved!");
		} catch (err: any) {
			setMessage("Error when saving mood: " + err.message);
		}
	}

	async function handleTagSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (!moodId) {
			setMessage("No mood selected yet!");
			return;
		}

		if (!tag.trim()) {
			setMessage("Tag cannot be empty!");
			return;
		}

		if (tags.includes(tag)) {
			setMessage("This tag has already been added.");
			return;
		}

		try {
			const response = await fetch("/api/mood_tags", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ mood, tag }),
			});

			if (!response.ok) {
				throw new Error("Couldnt save tag");
			}

			setTags([...tags, tag]);
			setTag("");
			setMood("");
			setMessage("Tag added!");
		} catch (err: any) {
			setMessage("Error when saving tag: " + err.message);
		}
	}

	const handleNewMood = () => {
		setMood("");
		setMoodId(null);
		setTags([]);
		setMessage("");
	};

	return (
		<div>
			<h2>Register Mood</h2>

			<MoodSelector onMoodChange={handleMoodChange} />

			{mood && (
				<div>
					<h3>Selected Mood: {mood}</h3>
				</div>
			)}

			<form onSubmit={handleMoodSubmit}>
				<label>
					How you feelin'
					<input
						type="text"
						value={mood}
						onChange={(e) => setMood(e.target.value)}
					/>
				</label>
				<button type="submit">Save Mood</button>
			</form>

			{moodId && (
				<>
					<h2>Add tags</h2>
					<form onSubmit={handleTagSubmit}>
						<label>
							What u doin'
							<input
								type="text"
								value={tag}
								onChange={(e) => setTag(e.target.value)}
							/>
						</label>
						<button type="submit">Add tag</button>
					</form>
					<ul>
						{tags.map((t, index) => (
							<li key={index}>{t}</li>
						))}
					</ul>
				</>
			)}
			<p>{message}</p>
			<button onClick={handleNewMood}>New mood</button>
		</div>
	);
}

export default MoodTracker;
