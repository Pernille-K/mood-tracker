import { useEffect, useState } from "react";
import styles from "../../styles/Stats.module.scss";
import MoodDropdown from "../../components/MoodDropdown";
import TagsChart from "../../components/TagsChart";
import isEqual from "lodash.isequal";

const TagsByMoodPage = () => {
	const [tags, setTags] = useState<{ name: string; value: any }[]>([]);
	const [mood, setMood] = useState<string>("happy");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	useEffect(() => {
		document.body.style.backgroundColor = "#fff4d4";
		return () => {
			document.body.style.backgroundColor = "";
		};
	}, []);

	useEffect(() => {
		const fetchTags = async () => {
			const response = await fetch(`/api/stats/tags_by_mood?mood=${encodeURIComponent(mood)}`);
			if (!response.ok) throw new Error("Could not fetch tags");
			const raw = await response.json();
			const formatted = formatTagsForChart(raw);
			if (!isEqual(formatted, tags)) {
				setTags(formatted);
			}
		};

		fetchTags();
	}, [mood]);

	useEffect(() => {
		console.log("Mood changed:", mood);
	}, [mood]);

	useEffect(() => {
		console.log("Tags updated:", tags);
	}, [tags]);

	function formatTagsForChart(rawTags: { tag: string; created_at: string }[]) {
		const counts: Record<string, number> = {};
		rawTags.forEach((item) => {
			const t = item.tag;
			counts[t] = (counts[t] || 0) + 1;
		});

		const chartData = Object.keys(counts)
			.sort()
			.map((tag) => ({ name: tag, value: counts[tag] }));
		return chartData;
	}

	const handleMoodChange = (selectedMood: string) => {
		setMood(selectedMood);
	};

	return (
		<div className={styles.stats_container}>
			<h1 className={styles.stats_h1}>
				<img src="/favicon-assets/pwa-512x512.png"></img> Stats
			</h1>
			<MoodDropdown
				mood={mood}
				onMoodChange={handleMoodChange}
				isOpen={isDropdownOpen}
				setIsOpen={setIsDropdownOpen}
			></MoodDropdown>
			<div
				className={styles.stats_chart_area}
				style={{
					display: "flex",
					opacity: isDropdownOpen ? 0.5 : 1,
					pointerEvents: isDropdownOpen ? "none" : "auto",
				}}
			>
				<TagsChart data={tags}></TagsChart>
			</div>
			<footer className={styles.stats_footer}>
				<button className={styles.stats_btn}>Sort by tag instead</button>
				<button className={styles.stats_btn}>Show history</button>
			</footer>
		</div>
	);
};

export default TagsByMoodPage;
