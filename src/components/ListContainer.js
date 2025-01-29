import React, { useState, useEffect } from "react";

const ListComponent = () => {
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [newList, setNewList] = useState([]);
  const [checkedLists, setCheckedLists] = useState([]);
  const [isListCreationView, setIsListCreationView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await fetch("https://apis.ccbp.in/list-creation/lists");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const oddList = data.lists.filter(item => item.list_number % 2 !== 0);
        const evenList = data.lists.filter(item => item.list_number % 2 === 0);
        setList1(oddList);
        setList2(evenList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, []);

  const handleCheckboxChange = (list) => {
    setCheckedLists(prev =>
      prev.includes(list) ? prev.filter(l => l !== list) : [...prev, list]
    );
  };

  const handleCreateNewList = () => {
    if (checkedLists.length !== 2) {
      alert("Please select exactly two lists to create a new list.");
      return;
    }
    setIsListCreationView(true);
    setNewList([]);
  };
  const moveItem = (item, from, to, setFrom, setTo) => {
    setFrom(from.filter(i => i.id !== item.id));
    setTo([...to, item]);
  };

  const handleCancel = () => {
    setIsListCreationView(false);
    setNewList([]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={styles.container}>
      {!isListCreationView ? (
        <>
          <button style={styles.button} onClick={handleCreateNewList}>Create a new list</button>
          <div style={styles.listContainer}>
            {[list1, list2].map((list, index) => (
              <div key={index} style={styles.listBox}>
                <div style={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    checked={checkedLists.includes(index + 1)}
                    onChange={() => handleCheckboxChange(index + 1)}
                  />
                  <h3>List {index + 1}</h3>
                </div>
                <div style={styles.scrollBox}>
                  {list.map(item => (
                    <div key={item.id} style={styles.card}>
                      <strong>{item.name}</strong>
                      <p>{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <button style={styles.button} onClick={handleCancel}>Cancel</button>
          <div style={styles.listContainer}>
            <div style={styles.listBox}>
              <h3>List 1</h3>
              <div style={styles.scrollBox}>
                {list1.map(item => (
                  <div key={item.id} style={styles.card}>
                    <strong>{item.name}</strong>
                    <button onClick={() => moveItem(item, list1, newList, setList1, setNewList)}>➡</button>
                  </div>
                ))}
              </div>
            </div>
            <div style={styles.listBox}>
              <h3>New List</h3>
              <div style={styles.scrollBox}>
                {newList.map(item => (
                  <div key={item.id} style={styles.card}>
                    <strong>{item.name}</strong>
                    <button onClick={() => moveItem(item, newList, list1, setNewList, setList1)}>⬅</button>
                    <button onClick={() => moveItem(item, newList, list2, setNewList, setList2)}>➡</button>
                  </div>
                ))}
              </div>
            </div>
            <div style={styles.listBox}>
              <h3>List 2</h3>
              <div style={styles.scrollBox}>
                {list2.map(item => (
                  <div key={item.id} style={styles.card}>
                    <strong>{item.name}</strong>
                    <button onClick={() => moveItem(item, list2, newList, setList2, setNewList)}>⬅</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px" },
  button: { backgroundColor: "#3478F6", color: "#fff", padding: "10px 15px", border: "none", borderRadius: "5px", cursor: "pointer", marginBottom: "20px" },
  listContainer: { display: "flex", justifyContent: "left", gap: "20px", marginTop: "20px" },
  listBox: { backgroundColor: "#F8FBFF", padding: "15px", borderRadius: "10px", width: "300px", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", height: "400px", overflow: "hidden" },
  checkboxContainer: { display: "flex", alignItems: "center", gap: "10px" },
  scrollBox: { overflowY: "auto", maxHeight: "350px", paddingRight: "10px" },
  card: { backgroundColor: "#FFFFFF", padding: "10px", borderRadius: "8px", marginBottom: "10px", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }
};

export default ListComponent;