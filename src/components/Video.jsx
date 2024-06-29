import PropTypes from "prop-types";

import vidLoop from "/src/assets/Wupgrade_Loop.mp4";
import vidProcess from "/src/assets/Wupgrade_Process.mp4";
import tempBG from "/src/assets/temp_background.png";

function Video(props) {
	let vidSource = "";
	if (props.videoState == "Loop") vidSource = vidLoop;
	if (props.videoState == "Process") vidSource = vidProcess;

	return (
		<video autoPlay muted loop poster={tempBG}>
			<source src={vidSource} type="video/mp4" />
		</video>
	);
}

Video.defaultProps = {
	videoState: "Loop",
};
Video.propTypes = {
	videoState: PropTypes.string,
};

export default Video;
