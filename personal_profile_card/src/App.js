import logo from "./logo.svg";
import "./App.css";
import ProfileCard from "./components/ProfileCard";

function App() {
  return (
    <div className="App">
      <ProfileCard
        name="Udit Kapoor"
        bio="Full-stack Trainer passionate about React and Node.js. Love Sweets and Java."
        email="uditkapoor060@gmail.com"
        imageUrl="/assets/image.png"/>
    </div>
  );
}
export default App;
