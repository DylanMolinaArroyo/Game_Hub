import "./App.css";
import ListGroup from "./components/ListGroup";

function App() {
  let items = [
    "New York",
    "San Francisco",
    "Tokyo",
    "Ciudad Quesada",
    "Santa Rosa",
  ];
  const handledSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handledSelectItem}
      />
    </div>
  );
}

export default App;
