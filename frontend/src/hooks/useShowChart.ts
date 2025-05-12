import { useState, useEffect } from "react";

export function useShowChart() {
	const [showChart, setShowChart] = useState(true);

	useEffect(() => {
		const handleResize = () => {
			setShowChart(window.innerWidth > 350);
		};
		console.log("Width:", window.innerWidth);

		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return showChart;
}
