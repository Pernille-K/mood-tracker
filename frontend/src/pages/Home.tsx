import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Home.module.scss";

const Home = () => {
	useEffect(() => {
		document.body.style.backgroundColor = "#FF8bbd";
		return () => {
			document.body.style.backgroundColor = "";
		};
	}, []);
	return (
		<div className={styles.home_container}>
			<h1 className={styles.home_h1}>
				<img src="/favicon-assets/pwa-512x512.png"></img> Moodtracker
			</h1>
			<div className={styles.home_gridBtns}>
				<Link
					to="/register"
					className={styles.home_btn}
				>
					{" "}
					Register Mood{" "}
				</Link>
				<Link
					to="/stats"
					className={styles.home_btn}
				>
					{" "}
					Show stats{" "}
				</Link>
			</div>
		</div>
	);
};

export default Home;
