function Leaderboard(props) {
	return (
		<div className="leaderboard">
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
									<th scope="row">{props.leaderboard[i].name}</th>
									<td>{props.leaderboard[i].time}</td>
								</tr>
							);
						}
						return arr;
					})()}
				</tbody>
			</table>
		</div>
	);
}

export default Leaderboard;
