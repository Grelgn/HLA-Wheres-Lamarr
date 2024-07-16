import { useState, useEffect, useRef } from "react";

import Video from "./Video";
import Leaderboard from "./Leaderboard";

import imgCombineLogo from "/src/assets/combine_logo.png";
import imgBarcode from "/src/assets/barcode.png";

import audHover from "/src/assets/hover.wav";
import audSelect from "/src/assets/select.wav";
import audStart from "/src/assets/start.wav";
import audOpen from "/src/assets/open.wav";
import audComplete from "/src/assets/complete.wav";

import level1 from "/src/assets/levels/1.png";
import level2 from "/src/assets/levels/2.png";
import level3 from "/src/assets/levels/3.png";
import level4 from "/src/assets/levels/4.png";
import level5 from "/src/assets/levels/5.png";

const levels = [level1, level2, level3, level4, level5];
let shuffledLevels = levels;

function Game() {
	const [video, setVideo] = useState("Loop");
	const [startVisibility, setStartVisibility] = useState(true);
	const [UIvisibility, setUIvisibility] = useState(true);
	const [gameVisibility, setGameVisibility] = useState(false);
	const [selectVisibility, setSelectVisibility] = useState(false);
	const [gameEndVisibility, setGameEndVisibility] = useState(false);
	const [timeVisibility, setTimeVisibility] = useState(false);
	const [levelImage, setLevelImage] = useState("");
	const [currentLevel, setCurrentLevel] = useState(0);
	const [selectedCoords, setSelectedCoords] = useState([0, 0]);
	const [levelsAPI, setLevelsAPI] = useState([]);
	const [records, setRecords] = useState("");
	const [leaderboard, setLeaderboard] = useState("");
	const [time, setTime] = useState(0);
	const [timeRunning, setTimeRunning] = useState(false);
	const [timeFormatted, setTimeFormatted] = useState("");
	const [isSubmittable, setIsSubmittable] = useState(false);
	const [nameSubmittable, setNameSubmittable] = useState(false);
	const [nameSubmitted, setNameSubmitted] = useState(false);

	// Timer
	useEffect(() => {
		let interval;
		if (timeRunning) {
			interval = setInterval(() => {
				setTime((prevTime) => prevTime + 1000);
			}, 1000);
		} else if (!timeRunning) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [timeRunning]);

	useEffect(() => {
		let formatted = "";
		let hours = "0" + Math.floor(time / 1000 / 60 / 60);
		let minutes = ("0" + (Math.floor(time / 1000 / 60) % 60)).slice(-2);
		let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
		formatted += hours + minutes + seconds;
		console.log(formatted);
		setTimeFormatted(formatted);
	}, [time]);

	// Fetch levels
	useEffect(() => {
		fetch("http://localhost:3000/levels")
			.then((response) => response.json())
			.then((json) => setLevelsAPI(json))
			.catch((error) => console.error(error));
	}, []);

	// Button hover
	function handleHover(e) {
		if (e.target.classList.contains("not-selectable") == false) {
			const audioHover = new Audio(audHover);
			audioHover.volume = 0.4;
			audioHover.play();
		}
	}

	// Make button submittable on > 3 characters
	function validateName(e) {
		if (e.target.value.length >= 3) {
			setNameSubmittable(true);
		} else if (e.target.value.length < 3) {
			setNameSubmittable(false);
		}
	}

	// Start Game
	function handleStartClick() {
		const audioSelect = new Audio(audSelect);
		const audioStart = new Audio(audStart);
		const audioOpen = new Audio(audOpen);
		const audioComplete = new Audio(audComplete);
		audioSelect.volume = 0.4;
		audioStart.volume = 0.3;
		audioOpen.volume = 0.3;
		audioComplete.volume = 0.4;

		generateLevels();
		fetchRecords();
		audioSelect.play();
		setVideo("Process");
		setStartVisibility(false);
		setUIvisibility(false);
		audioOpen.play();
		setTimeout(() => {
			audioStart.play();
		}, 1000);
		setTimeout(() => {
			audioComplete.play();
			setVideo("Loop");
			setUIvisibility(true);
			setGameVisibility(true);
			setTimeVisibility(true);
			setTimeRunning(true);
		}, 9000);
	}

	function toggleFullscreen(event) {
		// var element = document.querySelector("main");
		var element = document.documentElement;

		if (event instanceof HTMLElement) {
			element = event;
		}

		var isFullscreen =
			document.webkitIsFullScreen || document.mozFullScreen || false;

		element.requestFullScreen =
			element.requestFullScreen ||
			element.webkitRequestFullScreen ||
			element.mozRequestFullScreen ||
			function () {
				return false;
			};
		document.cancelFullScreen =
			document.cancelFullScreen ||
			document.webkitCancelFullScreen ||
			document.mozCancelFullScreen ||
			function () {
				return false;
			};

		isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
	}

	function handleImgClick(e) {
		if (!selectVisibility) setSelectVisibility(true);
		let { x, y, height } = e.target.getBoundingClientRect();
		const areaX = e.clientX - x;
		const areaY = e.clientY - y;
		const ratio = 1080 / height;
		let realX = areaX * ratio;
		let realY = areaY * ratio;
		console.log(`X: ${areaX} Y: ${areaY}`);
		console.log(`X: ${realX} Y: ${realY}`);

		if (realX < 41) realX = 41;
		if (realY < 42) realY = 42;

		if (realX > 1877) realX = 1877;
		if (realY > 1035) realY = 1035;

		const coordX = realX / ratio + x;
		const coordY = realY / ratio + y;

		const header = document.querySelector("header");
		const headerHeight = header.clientHeight;

		const selection = document.querySelector(".select-area");
		selection.style.left = `calc(${coordX}px - 2.5vh)`;
		selection.style.top = `calc(${coordY}px - 2.5vh - ${headerHeight}px)`;

		setSelectedCoords([Math.round(realX), Math.round(realY)]);
		setIsSubmittable(true);
	}

	// Prevent selected area to move uintentionally
	window.addEventListener("resize", () => {
		if (selectVisibility) setSelectVisibility(false);
		setIsSubmittable(false);
	});

	// Level logic
	function generateLevels() {
		shuffledLevels = levels
			.map((value) => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);

		console.log(shuffledLevels);
		nextLevel();
	}

	function nextLevel() {
		setLevelImage(shuffledLevels[currentLevel]);
		setCurrentLevel(currentLevel + 1);
	}

	function handleSubmit() {
		const audioSelect = new Audio(audSelect);
		audioSelect.volume = 0.4;

		if (currentLevel == levelsAPI.length) {
			endGame();
		}

		const leeway = 35;
		let level = shuffledLevels[currentLevel - 1];
		level = level[level.length - 5];

		let solution = [];
		for (let i = 0; i < levelsAPI.length; i++) {
			const levelAPI = levelsAPI[i];
			if (levelAPI.name == level) {
				solution = levelAPI.solution;
			}
		}

		if (
			selectedCoords[0] < solution[0] + leeway &&
			selectedCoords[0] > solution[0] - leeway &&
			selectedCoords[1] < solution[1] + leeway &&
			selectedCoords[1] > solution[1] - leeway
		) {
			console.log("Correct");
			audioSelect.play();
			nextLevel();
		} else {
			console.log("False");
		}

		setSelectVisibility(false);
		setIsSubmittable(false);
	}

	function endGame() {
		const audioStart = new Audio(audStart);
		const audioOpen = new Audio(audOpen);
		const audioComplete = new Audio(audComplete);
		audioStart.volume = 0.3;
		audioOpen.volume = 0.3;
		audioComplete.volume = 0.4;

		setTimeRunning(false);
		setUIvisibility(false);
		setGameVisibility(false);
		setTimeVisibility(false);
		setVideo("Process");
		audioOpen.play();
		setTimeout(() => {
			audioStart.play();
		}, 1000);
		setTimeout(() => {
			audioComplete.play();
			setVideo("Loop");
			setUIvisibility(true);
			populateLeaderboard();
			setGameEndVisibility(true);
			setTimeVisibility(true);
		}, 9000);
	}

	function fetchRecords() {
		fetch("http://localhost:3000/records")
			.then((response) => response.json())
			.then((json) => setRecords(json))
			.catch((error) => console.error(error));
	}

	function populateLeaderboard() {
		setLeaderboard(
			records.filter((record) => {
				return record.name !== undefined;
			})
		);
	}

	function handleNameSubmit() {
		const div = document.querySelector(".submit-name");
		div.classList.add("submitted-name");
		console.log("name submitted");
		setNameSubmitted(true);
	}

	function restartGame() {
		window.location.reload();
	}

	return (
		<main>
			<Video videoState={video} key={video} />
			{UIvisibility && (
				<div className="game-top ui">
					<div className="top-left">
						<b>ECHO-1-12-7</b>
					</div>
					<div className="top-right">
						<p>PARASITIC VISCON TRAINING STATION 0.3.3.333</p>
						<img src={imgCombineLogo} />
					</div>
				</div>
			)}
			{startVisibility && (
				<div className="start">
					<h2>EXPOSE AND TAG ALL PARASITICS</h2>
					<button onClick={handleStartClick} onMouseEnter={handleHover}>
						START TRAINING
					</button>
				</div>
			)}
			<div className="split">
				<div className="left">
					{gameVisibility && (
						<div className="game">
							<img onClick={handleImgClick} src={levelImage} />
							<div
								className={
									"select-area " + (selectVisibility ? null : "hidden")
								}
							></div>
						</div>
					)}
					{gameEndVisibility && (
						<div className="game-end">
							<div className="submit-name">
								{nameSubmitted ? (
									<>
										<h2>RECORD SUBMITTED</h2>
										<button onClick={restartGame}>RESTART</button>
									</>
								) : (
									<>
										<h2>ENTER YOUR NAME</h2>
										<input
											onChange={validateName}
											type="text"
											maxLength={18}
											spellCheck={false}
										/>
										<button
											className={nameSubmittable ? null : "not-selectable"}
											disabled={nameSubmittable ? false : true}
											onClick={handleNameSubmit}
											onMouseEnter={handleHover}
										>
											SUBMIT
										</button>
									</>
								)}
							</div>
						</div>
					)}
					<div className="bottom-left">
						{UIvisibility && (
							<div className="barcode ui">
								<img src={imgBarcode} />
								<p>CIVIL PROTECTION ANNEX 19-81572</p>
							</div>
						)}
						{timeVisibility && (
							<div className="time">
								<div>YOUR TIME:</div>
								<div className="timer">
									{timeFormatted.slice(0, 2) !== "00" && (
										<>
											<div className="hours">{timeFormatted.slice(0, 2)}</div>
											<div>:</div>
										</>
									)}
									<div className="minutes">{timeFormatted.slice(-4, -2)}</div>
									<div>:</div>
									<div className="seconds">{timeFormatted.slice(-2)}</div>
								</div>
							</div>
						)}
					</div>
				</div>
				<div className="right">
					<div className="game-right">
						{gameVisibility && (
							<button
								className={
									"submit-selection submittable " +
									(isSubmittable ? null : "not-selectable")
								}
								disabled={isSubmittable ? false : true}
								onClick={handleSubmit}
								onMouseEnter={handleHover}
							>
								SUBMIT SELECTION
							</button>
						)}
						<Leaderboard
							gameEndVisibility={gameEndVisibility}
							leaderboard={leaderboard}
							key={leaderboard}
						/>
					</div>
					{UIvisibility && (
						<div className="bottom-right ui">
							<button
								className="fullscreen"
								onClick={toggleFullscreen}
								onMouseEnter={handleHover}
							>
								<span className="material-symbols-outlined">fullscreen</span>
							</button>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}

export default Game;
