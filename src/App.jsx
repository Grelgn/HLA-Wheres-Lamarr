import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import { useState } from "react";

function App() {
	const [aroundVisibility, setAroundVisibility] = useState(true);

	return (
		<>
			{aroundVisibility && <Header />}
			<Main setAroundVisibility={setAroundVisibility}/>
			{aroundVisibility && <Footer />}
		</>
	);
}

export default App;
