import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Post from "./components/Post";
import Posts from "./components/Posts";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/posts/:postId">
            <Post />
          </Route>
          <Route path="/">
            <Posts />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
