import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import RegisterMood from "./pages/RegisterMood";
// import ShowStats from "./pages/ShowStats";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				{/* <Route
					path="/register"
					element={<RegisterMood />}
				/>
				<Route
					path="/stats"
					element={<ShowStats />}
				/> */}
			</Routes>
		</Router>
	);
}

export default App;
