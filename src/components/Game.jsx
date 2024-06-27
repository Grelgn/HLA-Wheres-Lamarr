import Video from "./Video";

import imgCombineLogo from "/src/assets/combine_logo.png";
import imgBarcode from "/src/assets/barcode.png";

function Game() {
  return (
    <main>
      <Video />
      <div className="game-top">
        <div className="top-left">
          <b>ECHO-1-12-7</b>
        </div>
        <div className="top-right">
          <p>BIOTICS VISCON TRAINING STATION 0.3.3.333</p>
          <img src={imgCombineLogo}/>
        </div>
      </div>
      <div className="game-bottom">
        <img src={imgBarcode} />
        <p>CIVIL PROTECTION ANNEX 19-81572</p>
      </div>
    </main>
  )
}

export default Game;