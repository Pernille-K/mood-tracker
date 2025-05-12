import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegisterMood from "./pages/RegisterMood";
import TagPage from "./pages/register/tags";
import MoodPage from "./pages/register/mood";
import TagsByMoodPage from "./pages/stats/tagsByMood";
// import ShowStats from "./pages/ShowStats";
import "./styles/global.scss";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/register"
					element={<RegisterMood />}
				/>
				<Route
					path="/register/tags"
					element={<TagPage />}
				/>
				<Route
					path="/register/mood"
					element={<MoodPage />}
				/>
				<Route
					path="stats/tags_by_mood"
					element={<TagsByMoodPage />}
				/>

				{/* // <Route
				// 	path="/stats"
				// 	element={<ShowStats />}
				// />  */}
			</Routes>
		</Router>
	);
}

export default App;
