import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const callTest = async () => {
    const resData = await axios.get("/test");
    console.log(resData.data.test);
  };

  const callApi = async () => {
    axios.get("/api").then((res) => {
      console.log(res.data.api);
    });
  };

  useEffect(() => {
    callTest();
    callApi();
  }, []);

  return <div className="App"></div>;
}

export default App;
