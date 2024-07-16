function Leaderboard(props) {
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
											<td>{props.leaderboard[i].time}</td>
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
