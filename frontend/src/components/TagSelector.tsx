import styles from "../styles/TagSelector.module.scss";

function TagSelector({
	onTagToggle,
	selectedTags,
	availableTags,
}: {
	onTagToggle: (tag: string) => void;
	selectedTags: string[];
	availableTags: string[];
}) {
	return (
		<div className={styles.tagselector_gridBtns}>
			{availableTags.map((tag) => (
				<button
					key={tag}
					className={
						selectedTags.includes(tag)
							? `${styles.tagselector_btn} ${styles.tagselector_btn_selected}`
							: `${styles.tagselector_btn}`
					}
					onClick={() => onTagToggle(tag)}
				>
					{tag}
				</button>
			))}
		</div>
	);
}

export default TagSelector;
