import React from "react";
import './Rightbar.css';
import bullsandbears from "../images/bullsandbears.png";
import sentiment from "../images/sentiment.png";
import academy from "../images/academy.png";
import youtube from "../images/youtube.png";
import js from "../images/js.png";
import { Input } from "web3uikit";


const Rightbar = () => {
  const trends = [
    {
      img: bullsandbears,
      text: "U know that, U understand that! Bulls&Bears NFTs. Mint today!",
      link: "https://bullsandbearsnft.io/",
    },
    {
      img: sentiment,
      text: "Vote bullish or bearish on your favorite crypto and earn NFT.",
      link: "http://sentiment.bullsandbearsnft.io/",
    },
    {
      img: academy,
      text: "Master DeFi in 2022. Start  at the Moralis Academy...",
      link: "https://academy.moralis.io/courses/defi-101",
    },
    {
      img: js,
      text: "Become a Web3 Developer with just simple JS...",
      link: "https://academy.moralis.io/all-courses",
    },
    {
      img: youtube,
      text: "Best youtube channel to learn about Web3...",
      link: "https://www.youtube.com/channel/UCgWS9Q3P5AxCWyQLT2kQhBw",
    },
  ];

  return (
    <>
    <div className="rightbarContent">
     {/* <Input
        label="Search Signal"
        name ="Search Signal"
        prefixIcon="search"
        labelBgColor="#141d26" 
        >
      </Input> */}

    <div className="trends">
      News For You
      {trends.map((e) => {
          return(
            <>
            <div className="trend" onClick={() => window.open(e.link)}>
              <img src={e.img} className="trendImg"></img>
              <div className="trendText">{e.text}</div>
            </div>
            </>
          )
      })}
    </div>

    </div>
    </>
  );
};

export default Rightbar;

