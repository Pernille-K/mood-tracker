import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
	return (
		<div className="container">
			<h1>
				<img src="/favicon-assets/pwa-512x512.png"></img> Moodtracker
			</h1>
			<div className="gridButtons">
				<Link
					className="button"
					to="/register"
				>
					{" "}
					Register Mood{" "}
				</Link>
				<Link
					className="button"
					to="/stats"
				>
					{" "}
					Show stats{" "}
				</Link>
			</div>
		</div>
	);
};

export default Home;
