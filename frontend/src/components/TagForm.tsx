import { useState } from "react";
import styles from "../styles/TagForm.module.scss";

function TagForm({ onAddTag }: { tag: string; onAddTag: (tag: string) => void }) {
	const [input, setInput] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (input.trim() != "") {
			onAddTag(input.trim());
			setInput("");
		}
	};

	return (
		<form
			className={styles.tagform_form}
			onSubmit={handleSubmit}
		>
			{" "}
			<label className={styles.tagform_label}>Or fill in tag:</label>
			<input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				className={styles.tagform_input}
				placeholder="..."
			/>
			<button
				type="submit"
				className={styles.tagform_btn}
			>
				Add
			</button>
		</form>
	);
}

export default TagForm;
