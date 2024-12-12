import { useState, useEffect } from "react";

import Video from "./Video";
import Leaderboard from "./Leaderboard";

import imgCombineLogo from "/src/assets/combine_logo.png";
import imgBarcode from "/src/assets/barcode.png";

import audHover from "/src/assets/audio/ui_hover.wav";
import audSelect from "/src/assets/audio/ui_select.wav";
import audDenied from "/src/assets/audio/ui_denied.wav";
import audStart from "/src/assets/audio/upgrading.wav";
import audOpen from "/src/assets/audio/chamber_open.wav";
import audComplete from "/src/assets/audio/work_complete.wav";
import audOpen2 from "/src/assets/audio/upgrader_open.wav";

const database = import.meta.env.VITE_DATABASE;

// Import levels
// const levels = Object.keys(import.meta.glob("/src/assets/levels/*.webp"));
// Needed to lay them all out like before because vercel did not see the images when they're imported with glob
import level01 from "/src/assets/levels/level_01.webp";
import level02 from "/src/assets/levels/level_02.webp";
import level03 from "/src/assets/levels/level_03.webp";
import level04 from "/src/assets/levels/level_04.webp";
import level05 from "/src/assets/levels/level_05.webp";
import level06 from "/src/assets/levels/level_06.webp";
import level07 from "/src/assets/levels/level_07.webp";
import level08 from "/src/assets/levels/level_08.webp";
import level09 from "/src/assets/levels/level_09.webp";
import level10 from "/src/assets/levels/level_10.webp";
import level11 from "/src/assets/levels/level_11.webp";
import level12 from "/src/assets/levels/level_12.webp";
import level13 from "/src/assets/levels/level_13.webp";
import level14 from "/src/assets/levels/level_14.webp";
import level15 from "/src/assets/levels/level_15.webp";
import level16 from "/src/assets/levels/level_16.webp";
import level17 from "/src/assets/levels/level_17.webp";
import level18 from "/src/assets/levels/level_18.webp";
import level19 from "/src/assets/levels/level_19.webp";
import level20 from "/src/assets/levels/level_20.webp";
import level21 from "/src/assets/levels/level_21.webp";
import level22 from "/src/assets/levels/level_22.webp";
import level23 from "/src/assets/levels/level_23.webp";
import level24 from "/src/assets/levels/level_24.webp";
import level25 from "/src/assets/levels/level_25.webp";
import level26 from "/src/assets/levels/level_26.webp";
import level27 from "/src/assets/levels/level_27.webp";
import level28 from "/src/assets/levels/level_28.webp";
import level29 from "/src/assets/levels/level_29.webp";
import level30 from "/src/assets/levels/level_30.webp";
import level31 from "/src/assets/levels/level_31.webp";
import level32 from "/src/assets/levels/level_32.webp";
import level33 from "/src/assets/levels/level_33.webp";
import level34 from "/src/assets/levels/level_34.webp";
import level35 from "/src/assets/levels/level_35.webp";
import level36 from "/src/assets/levels/level_36.webp";
import level37 from "/src/assets/levels/level_37.webp";
import level38 from "/src/assets/levels/level_38.webp";
import level39 from "/src/assets/levels/level_39.webp";
import level40 from "/src/assets/levels/level_40.webp";

const levels = [
	level01,
	level02,
	level03,
	level04,
	level05,
	level06,
	level07,
	level08,
	level09,
	level10,
	level11,
	level12,
	level13,
	level14,
	level15,
	level16,
	level17,
	level18,
	level19,
	level20,
	level21,
	level22,
	level23,
	level24,
	level25,
	level26,
	level27,
	level28,
	level29,
	level30,
	level31,
	level32,
	level33,
	level34,
	level35,
	level36,
	level37,
	level38,
	level39,
	level40,
];

import levelsJSON from "/levels.json";

function Main(props) {
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
	const [levelList] = useState(levelsJSON);
	const [records, setRecords] = useState("");
	const [leaderboard, setLeaderboard] = useState("");
	const [time, setTime] = useState(0);
	const [timeRunning, setTimeRunning] = useState(false);
	const [timeFormatted, setTimeFormatted] = useState("");
	const [isSubmittable, setIsSubmittable] = useState(false);
	const [nameSubmittable, setNameSubmittable] = useState(false);
	const [nameSubmitted, setNameSubmitted] = useState(false);
	const [userID, setUserID] = useState("");
	const [userName, setUserName] = useState("");

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
		setTimeFormatted(formatted);
	}, [time]);

	// Button hover
	function handleHover(e) {
		if (e.target.classList.contains("not-selectable") == false) {
			const audioHover = new Audio(audHover);
			audioHover.volume = 0.5;
			audioHover.play();
		}
	}

	// Make button submittable on > 3 characters
	function validateName(e) {
		if (e.target.value.length >= 3) {
			setUserName(e.target.value);
			setNameSubmittable(true);
		} else if (e.target.value.length < 3) {
			setNameSubmittable(false);
		}
	}

	// Start Game
	function handleStartClick() {
		const audioSelect = new Audio(audSelect);
		const audioOpen = new Audio(audOpen);
		const audioOpen2 = new Audio(audOpen2);
		audioSelect.volume = 0.5;
		audioOpen.volume = 0.5;
		audioOpen2.volume = 0.5;

		props.setAroundVisibility(false);
		const root = document.querySelector("#root");
		root.classList.add("root-game");

		nextLevel();
		audioSelect.play();
		setVideo("Boot");
		setStartVisibility(false);
		setUIvisibility(false);
		audioOpen.play();
		setTimeout(() => {
			audioOpen2.play();
		}, 1000);
		setTimeout(() => {
			setVideo("Loop");
			setUIvisibility(true);
			setGameVisibility(true);
			setTimeVisibility(true);
			setTimeRunning(true);
			startTime();
		}, 4000);
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
		const areaX = e.clientX - Math.round(x);
		const areaY = e.clientY - Math.round(y);
		const ratio = 1080.0 / height;
		let realX = areaX * ratio;
		let realY = areaY * ratio;

		if (realX < 41) realX = 41;
		if (realY < 42) realY = 42;

		if (realX > 1877) realX = 1877;
		if (realY > 1035) realY = 1035;

		const coordX = realX / ratio + x;
		const coordY = realY / ratio + y;

		const selection = document.querySelector(".select-area");
		selection.style.left = `calc(${coordX}px - 2.5vh)`;
		selection.style.top = `calc(${coordY}px - 2.5vh)`;

		setSelectedCoords([Math.round(realX), Math.round(realY)]);
		setIsSubmittable(true);
	}

	// Prevent selected area to move uintentionally
	window.addEventListener("resize", () => {
		if (selectVisibility) setSelectVisibility(false);
		setIsSubmittable(false);
	});

	function nextLevel() {
		setLevelImage(levels[currentLevel]);
		setCurrentLevel(currentLevel + 1);
	}

	function handleSubmit() {
		const audioSelect = new Audio(audSelect);
		const audioDenied = new Audio(audDenied);
		audioSelect.volume = 0.5;
		audioDenied.volume = 0.5;

		const leeway = 35;

		let solution = levelList[currentLevel - 1].solution;

		if (
			selectedCoords[0] < solution[0] + leeway &&
			selectedCoords[0] > solution[0] - leeway &&
			selectedCoords[1] < solution[1] + leeway &&
			selectedCoords[1] > solution[1] - leeway
		) {
			audioSelect.play();
			if (currentLevel == levelList.length) {
				endGame();
			} else nextLevel();
		} else {
			audioDenied.play();
		}

		setSelectVisibility(false);
		setIsSubmittable(false);
	}

	function endGame() {
		const audioStart = new Audio(audStart);
		const audioOpen = new Audio(audOpen);
		const audioComplete = new Audio(audComplete);
		audioStart.volume = 0.5;
		audioOpen.volume = 0.5;
		audioComplete.volume = 0.5;

		fetchRecords();
		endTime();
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
			setGameEndVisibility(true);
			setTimeVisibility(true);

			props.setAroundVisibility(true);
			const root = document.querySelector("#root");
			root.classList.remove("root-game");
		}, 9000);
	}

	async function fetchRecords() {
		const response = await fetch(database + "records", {
			method: "GET",
		});
		const content = await response.json();
		setRecords(content);
	}

	async function startTime() {
		const response = await fetch(database + "record", {
			method: "POST",
		});
		const content = await response.json();
		setUserID(content.id);
		console.log(content.message);
	}

	async function endTime() {
		const response = await fetch(database + "record/" + userID, {
			method: "PATCH",
		});
		const content = await response.json();
		console.log(content.message);
	}

	async function addName() {
		const urlencoded = new URLSearchParams({
			name: userName,
		});

		const response = await fetch(database + "record/" + userID, {
			method: "PATCH",
			body: urlencoded,
		});
		const content = await response.json();
		console.log(content.message);
	}

	// Populate leaderboard when records are updated
	useEffect(() => {
		if (records !== "") {
			let board = records.filter((record) => {
				return record.name !== null;
			});

			board.forEach((record) => {
				const start = new Date(record.timeStart);
				const end = new Date(record.timeEnd);

				let milliseconds = Math.abs(end - start);

				record.milliseconds = milliseconds;
			});

			board.sort((a, b) => a.milliseconds - b.milliseconds);
			board = board.slice(0, 10);

			setLeaderboard(board);
		}
	}, [records]);

	async function handleNameSubmit() {
		const audioSelect = new Audio(audSelect);
		audioSelect.volume = 0.5;
		audioSelect.play();
		const div = document.querySelector(".submit-name");
		div.classList.add("submitted-name");
		setNameSubmitted(true);
		await addName();
		fetchRecords();
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
										<button onClick={restartGame} onMouseEnter={handleHover}>
											RESTART
										</button>
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
							<>
								<div className="level-info">
									<h2>STAGE: {currentLevel}</h2>
								</div>
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
							</>
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

export default Main;
