import SideBar from "./components/SideBar.js";
import Posts from "./components/Posts.js";

function App() {
  return (
    <div className="App">
      <SideBar />
      <main>
        <Posts />
      </main>
    </div>
  );
}
export default App;
