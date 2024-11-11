function Leaderboard(props) {
	function formatTime(milliseconds) {
		let formatted = "";

		const time = new Date(Date.UTC(0, 0, 0, 0, 0, 0, milliseconds));
		const parts = [
			time.getUTCHours(),
			time.getUTCMinutes(),
			time.getUTCSeconds(),
		];

		formatted = parts.map((s) => String(s).padStart(2, "0")).join(":");
		if (formatted.slice(0, 2) == "00") formatted = formatted.slice(3);

		return formatted;
	}

	return (
		<>
			{props.gameEndVisibility && (
				<div className="leaderboard game-end">
					<h2>LEADERBOARD</h2>
					<table>
						<thead>
							<tr>
								<th scope="col">NAME</th>
								<th scope="col">TIME</th>
							</tr>
						</thead>
						<tbody>
							{(() => {
								const arr = [];
								for (let i = 0; i < props.leaderboard.length; i++) {
									arr.push(
										<tr key={i}>
											<td>{props.leaderboard[i].name}</td>
											<td>{formatTime(props.leaderboard[i].milliseconds)}</td>
										</tr>
									);
								}
								return arr;
							})()}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}

export default Leaderboard;
