import React from "react";
import "./Home.css";
import { defaultImgs } from "../defaultimgs";
import { TextArea, Icon } from "web3uikit";
import { useState, useRef } from "react";
import SignalInFeed from "../components/SignalInFeed";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

const Home = () => {

  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const contractProcessor = useWeb3ExecuteFunction();

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [theFile, setTheFile] = useState();
  const [signal, setSignal] = useState();

  async function maticSignal() {

    if (!signal) return;

    let img;
    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      img = file.ipfs();
    }else{
      img = "No Img"
    }

    let options = {
      contractAddress: "0xf6B537351D2a0702ab4C4064099eF83576AdD665",
      functionName: "addSignal",
      abi: [{
        "inputs":[
          {
            "internalType":"string",
            "name":"signalTxt",
            "type":"string"},
          {
            "internalType":"string",
            "name":"signalImg",
            "type":"string"}
          ],
          "name":"addSignal",
          "outputs":[],
          "stateMutability":"payable",
          "type":"function"
        }],
      params: {
        signalTxt: signal,
        signalImg: img,
      },
      msgValue: Moralis.Units.ETH(1),
    }

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        saveSignal();
      },
      onError: (error) => {
        console.log(error.data.message)
      }
    });

  }


  async function saveSignal() {

    if(!signal) return;

    const Signals = Moralis.Object.extend("Signals");

    const newSignal = new Signals();

    newSignal.set("signalTxt", signal);
    newSignal.set("signalerPfp", user.attributes.pfp);
    newSignal.set("signalAcc", user.attributes.ethAddress);
    newSignal.set("signalerUserName", user.attributes.username);

    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      newSignal.set("signalImg", file.ipfs());
    }

    await newSignal.save();
    window.location.reload();

  }

  const onImageClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <>
    <div className="pageIdentify">Home</div>
      <div className="mainContent">
        <div className="profileSignal">
          <img src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]} className="profilePic"></img>
          <div className="signalBox">
            <TextArea
              label=""
              name="signalTxtArea"
              value="Your signal here"
              type="text"
              onChange={(e) => setSignal(e.target.value)}
              width="95%"
            ></TextArea>
            {selectedFile && (
              <img src={selectedFile} className="signalImg"></img>
            )}
            <div className="imgOrSignal">
              <div className="imgDiv" onClick={onImageClick}>
              <input
                  type="file"
                  name="file"
                  ref={inputFile}
                  onChange={changeHandler}
                  style={{ display: "none"}}
                />
                <Icon fill="#1DA1F2" size={20} svg="image"></Icon>
              </div>
              <div className="signalOptions">
                <div className="signal" onClick={saveSignal}>SendSignal</div>
                <div className="signal" onClick={maticSignal} style={{ backgroundColor: "#8247e5" }}>
                  <Icon fill="#ffffff" size={20} svg="matic" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SignalInFeed profile={false}/>
      </div>
    </>
  );
};

export default Home;
