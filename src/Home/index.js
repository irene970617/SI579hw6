import List from "./components/List";
import Save from "./components/Save";
import Input from "./components/Input";
import { useState } from "react";
const Home = () => {
    const [word, setWord] = useState([]);
    const [save, setSave] = useState("");
    

    return (
        <div className="container">
            <h1>Rhyme Finder (579 Problem Set 6)</h1>
            <a href="https://github.com/irene970617/SI579hw6">https://github.com/irene970617/SI579hw6</a>
            <Save save={save} />
            <Input search={setWord} />
            <List  word={word} saveWord={setSave} />
        </div>
    );
};

export default Home;