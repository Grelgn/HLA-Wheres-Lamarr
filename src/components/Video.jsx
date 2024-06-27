import vidLoop from "/src/assets/Wupgrade_Loop.mp4";
import tempBG from "/src/assets/temp_background.png"

function Video() {
	return (
		<video autoPlay muted loop poster={tempBG}>
			<source src={vidLoop} type="video/mp4" />
		</video>
	);
}

export default Video;
