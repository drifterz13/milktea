import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { Text, StyleSheet, View } from "react-native";

import Container from "./Container";
import Command from "./Command";
import Title from "./Title";
import Result from "./Result";
import Size from "./Size";


function App() {

  const [size, setSize] = useState(["-size-", "Small", "Medium", "Large"]) // 5, 10, 15 mins
  const handleAddrTypeChange = (e) => console.log((size[e.target.value]))

  let acl = new Accelerometer({ frequency: 5 });
  const [result, setResult] = useState("");
  const aclx = [];
  const acly = [];
  const aclz = [];

  function getAccelerometer() {
    acl.addEventListener('reading', () => {
      aclx.push(acl.x);
      acly.push(acl.y);
      aclz.push(acl.z);
    });
    acl.start();
  }

  function stopAccelerometer() {
    acl.stop();
    setResult(aclx + acly + aclz);
  }

  return (
    <Container>
      <Title title={"MILK TEA SOUND ALLIANCE"} />
      <Size handleAddrTypeChange={handleAddrTypeChange} size={size} />
      <View>
        <Command
          getAccelerometer={getAccelerometer}
          stopAccelerometer={stopAccelerometer}
          description={"STOP"}
          command={"START"}
        />
      </View>
      <Result result={result} />
    </Container >
  );
}

export default App;
