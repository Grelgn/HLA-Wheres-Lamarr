import vidBoot from "/src/assets/wupgrade_boot.mp4";
import vidLoop from "/src/assets/wupgrade_loop.mp4";
import vidProcess from "/src/assets/wupgrade_frabrication.mp4";
import tempBG from "/src/assets/temp_background.png";

function Video(props) {
	let vidSource = "";
	if (props.videoState == "Boot") vidSource = vidBoot;
	if (props.videoState == "Loop") vidSource = vidLoop;
	if (props.videoState == "Process") vidSource = vidProcess;

	return (
		<video autoPlay muted loop poster={tempBG}>
			<source src={vidSource} />
		</video>
	);
}

export default Video;
