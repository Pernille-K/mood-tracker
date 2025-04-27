import { useState } from "react";
import "./App.css";
import MoodList from "./components/MoodList";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<h1>Moodtracker</h1>
			<button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
			<MoodList />
		</>
	);
}

export default App;
