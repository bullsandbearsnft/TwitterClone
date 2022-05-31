import React from "react";
import "./SignalInFeed.css";
import { defaultImgs } from "../defaultimgs";
import { Icon } from "web3uikit";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";

const SignalInFeed = ({ profile }) => {
  const [signalArr, setSignalArr] = useState();
  const { Moralis, account } = useMoralis();

  useEffect(() => {
    async function getSignals() {
      try {
        const Signals = Moralis.Object.extend("Signals");
        const query = new Moralis.Query(Signals);
        if (profile) {
          query.equalTo("signalAcc", account);
        }
        const results = await query.find();

        setSignalArr(results);
        console.log(results);
      } catch (error) {
        console.error(error);
      }
    }
    getSignals();
  }, [profile]);

  return (
    <>
      {signalArr?.map((e) => {
        return (
          <>
            <div className="feedSignal">
              <img src={e.attributes.signalerPfp ?e.attributes.signalerPfp : defaultImgs[0]} className="profilePic"></img>
              <div className="completeSignal">
                <div className="who">
                {e.attributes.signalerUserName.slice(0, 6)}
                  <div className="accWhen">{
                        `${e.attributes.signalAcc.slice(0, 4)}...${e.attributes.signalAcc.slice(38)} · 
                        ${e.attributes.createdAt.toLocaleString('en-us', { month: 'short' })}  
                        ${e.attributes.createdAt.toLocaleString('en-us', { day: 'numeric' })}
                        `  
                      }
                      </div>
                </div>
                <div className="signalContent">
                {e.attributes.signalTxt}
                {e.attributes.signalImg && (
                        <img
                          src={e.attributes.signalImg}
                          className="signalImg"
                        ></img>
                      )}
                </div>
                {/*<div className="interactions">
                  <div className="interactionNums">
                    <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
                  </div>
                  
                  <div className="interactionNums">
                    <Icon fill="#3f3f3f" size={20} svg="star" />
                    12
                  </div>
                  <div className="interactionNums">
                    <Icon fill="#3f3f3f" size={20} svg="matic" />
                  </div>
                </div>*/}
              </div>
            </div>
          </>
        );
      }).reverse()}

    </>
  );
};

export default SignalInFeed;
