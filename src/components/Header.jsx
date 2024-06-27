import imgLogo from "/dist/assets/HLA_logo.png"

function Header() {
	return (
		<header>
			<img src={imgLogo} alt="" height={75} />
			<h1>WHERE&apos;S LAMARR?</h1>
		</header>
	);
}

export default Header;
