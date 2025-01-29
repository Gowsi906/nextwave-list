import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createList } from "../listSlice";

const CreateList = () => {
  const [listName, setListName] = useState("");
  const dispatch = useDispatch();

  const handleCreate = () => {
    if (listName.trim()) {
      dispatch(createList(listName));
      setListName("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <button onClick={handleCreate}>Create List</button>
    </div>
  );
};

export default CreateList;
