type TagListProps = {
	tags: string[];
};

function TagList({ tags }: TagListProps) {
	return (
		<ul>
			{tags.map((t, index) => (
				<li key={index}>{t}</li>
			))}
		</ul>
	);
}

export default TagList;
