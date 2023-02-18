import React, { useEffect } from "react";
import Menu from "./Menu";
// Importing All The Wallpapers Which We Have To Change According To The User
import Forest from "../Wallpapers/Forest.jpg";
import logo from "../Wallpapers/images.jfif";
import Beach from "../Wallpapers/Beach.jpg";
import City from "../Wallpapers/City.jpg";
import Valley from "../Wallpapers/Valley.jpg";
import Desert from "../Wallpapers/Desert.jpg";
import Food from "../Wallpapers/Food.jpg";
import Mountain from "../Wallpapers/Mountain.jpg";
import Ocean from "../Wallpapers/Ocean.jpg";
import Countryside from "../Wallpapers/Countryside.jpg";
// Importing all The Required Funnctions of Player.js File for Functionning odf Our Music Player
import {
  replay,
  setProgress,
  isPlaying,
  dragStart,
  drag,
  dragEnd,
} from "./Player";

function Screen(props) {
  var obj = props.isToggled;

  // This hook I have used to render according to the props that whenever we reopen our wifi, bluetooth or gps page it shuld look like as we left it previously.
  useEffect(() => {
    let settingsArr = ["WiFi", "Bluetooth"];
    if (settingsArr.includes(props.menu)) {
      let toggler = document.getElementById(`toggler-${props.menu}`);
      let togglerDiv = document.getElementById(`toggler-div-${props.menu}`);
      if (props.menu === "WiFi") {
        if (obj.WiFi) {
          togglerDiv.style.backgroundColor = "orangered";
          toggler.style.left = "55%";
        } else {
          togglerDiv.style.backgroundColor = null;
          toggler.style.left = null;
        }
      } else if (props.menu === "Bluetooth") {
        if (obj.Bluetooth) {
          togglerDiv.style.backgroundColor = "orangered";
          toggler.style.left = "55%";
        } else {
          togglerDiv.style.backgroundColor = null;
          toggler.style.left = null;
        }
      }
    }
    //------------------------------- Logic for our Catch Me Game --------------------------------------
    else if (props.menu === "CatchMe") {
      const box = document.getElementById("box");

      box.addEventListener("mouseover", function () {
        let top = Math.floor(Math.random() * 86);
        let left = Math.floor(Math.random() * 88);
        box.style.top = top + "%";
        box.style.left = left + "%";
      });
    }
  }, [obj, props.isToggled, props.menu]);

  // The function for Changing the Song Time according to Users Click on the player progress bar
  function changeDurationByClick(e) {
    
    if (isPlaying !== "notStarted") {
      // These are the CoOrdinates of the player div inside which progress of our song is going on
      const rect = document
        .getElementById("player-bar")
        .getBoundingClientRect();
      console.log(rect);
      
      const playerWidth = rect.width;
      
      const clickLocation = e.clientX - rect.left;
     
      setProgress(clickLocation, playerWidth);
    }
  }

  const arr = [
    "mainMenu",
    "gamesMenu",
    "musicMenu",
    "songsMenu",
    "settingsMenu",
    "wallpaperMenu",
  ];

  if (arr.includes(props.menu)) {
    return (
      <div id="screen" style={{ backgroundImage: `url(${props.wallpaper})` }}>
        <Menu
          menu={props.menu}
          items={props.items}
          option={props.option}
        ></Menu>
      </div>
    );
  } else if (props.menu === "CoverFlow") {
    return (
      <div
        id="screen"
        style={{ backgroundImage: `url(${props.wallpaper})` }}
      ></div>
    );
  } else if (props.menu === "CatchMe") {
    return (
      <div id="screen-without-bg" style={{ padding: "15px" }}>
        <div id="viewport">
          <div id="box" style={{ top: "45%", left: "45%" }}>
            <p>Catch Me If You Can</p>
          </div>
        </div>
      </div>
    );
  } else if (props.menu === "audioPage") {
    return (
      <div
        id="screen-without-bg"
        style={{ padding: "0", alignItems: "flex-start" }}
      >
        <center style={{ marginTop: "25px" }}>{props.audioName}</center>
        <div className="audio">
          <center>
            <i
              className="fas fa-play fa-2x"
              id="replay"
              onClick={() => replay(props.audioLink)}
            ></i>
          </center>
          <div className="player">
            <p id="current-time" style={{ marginLeft: "13px" }}>
              0:00
            </p>
            <div
              className="progress-div"
              id="player-bar"
              onClick={changeDurationByClick}
              onMouseDown={dragStart}
              onTouchStart={dragStart}
              onMouseUp={dragEnd}
              onTouchEnd={dragEnd}
              onMouseMove={drag}
              onTouchMove={drag}
            >
              <div className="progress-bar" id="progress"></div>
              <div id="progress-tip"></div>
            </div>
            <p className="ls" id="duration" style={{ marginLeft: "5px" }}>
              0:00
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return props.text;
  }
}

export default Screen;
