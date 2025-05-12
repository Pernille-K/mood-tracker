import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import styles from "../../src/styles/Stats.module.scss";
// import { useIsMobile } from "../hooks/useIsMobile";
import { useShowChart } from "../hooks/useShowChart";

type TagsChartProps = {
	data: { name: string; value: number }[];
};

const COLORS = [
	"#ff8bbd",
	"#ad0069",
	"#dcabfe",
	"#7a1abf",
	"#aed9ff",
	"#0064bb",
	"#aeeedb",
	"#4a9780",
	"#664500",
];

const CustomTooltip = ({ active, payload }: any) => {
	if (active && payload && payload.length > 0) {
		const { name, value, payload: dataPayload } = payload[0];
		const total = dataPayload.total;
		const percent = total ? (value / total) * 100 : 0;
		const fill = dataPayload.fill;

		return (
			<div
				style={{
					background: "#fff4d4",
					// background: fill,
					border: "1px solid #ffde91",
					padding: "8px 12px",
					borderRadius: "10px",
					color: fill,
					// color: "#664500",
					fontSize: "18px",
				}}
			>
				<strong>{name}</strong> ({percent.toFixed(0)}%)
			</div>
		);
	}
	return null;
};

const TagsChart = ({ data }: TagsChartProps) => {
	const total = data.reduce((sum, entry) => sum + entry.value, 0);
	const chartData = data.map((entry, index) => ({
		...entry,
		fill: COLORS[index % COLORS.length],
		total,
	}));

	const showChart = useShowChart();

	

	// const isMobile = useIsMobile();

	if (data.length === 0) {
		console.log(data);
		return <p className={styles.stats_p}> No tags for this mood yet!</p>;
	}

	return (
		<div className={styles.stats_chart_wrapper}>
			{showChart && (
				<div className={styles.stats_responsive_container_wrapper}>
					<ResponsiveContainer
						width="100%"
						height={170}
					>
						<PieChart>
							<Pie
								data={chartData}
								cx="50%"
								cy="50%"
								// label={
								// 	!isMobile ? ({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)` : undefined
								// }
								style={{ fontWeight: "bold" }}
								labelLine={false}
								outerRadius="100%"
								fill="#fff4d4"
								dataKey="value"
								stroke="#fff4d4"
								strokeWidth={1}
							>
								{chartData.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={entry.fill}
										stroke={"#ffde91"}
										strokeWidth={2.5}
									/>
								))}
							</Pie>
							<Tooltip content={<CustomTooltip />} />
						</PieChart>
					</ResponsiveContainer>
				</div>
			)}

			<div
				className={`${styles.stats_labels_wrapper} ${
					chartData.length > 10 ? styles.multi_column : ""
				}  ${chartData.length === 1 ? styles.single : ""} `}
			>
				{chartData.map((entry, index) => {
					return (
						<div
							key={index}
							className={styles.stats_label}
							style={{ color: entry.fill }}
						>
							<strong>{entry.name}</strong>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default TagsChart;
