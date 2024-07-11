import imgLogo from "/src/assets/HLA_logo.png"

function Header() {
	return (
		<header>
			<img src={imgLogo} alt="" />
			<h1>WHERE&apos;S LAMARR?</h1>
		</header>
	);
}

export default Header;
