import React from "react";
import ListContainer from "./components/ListContainer"; // ✅ Ensure correct path

const App = () => {
  return (
    <div>
      <center><h1>List Creation</h1></center>
      <ListContainer /> {/* ✅ Ensure this component is used */}
    </div>
  );
};

export default App;
