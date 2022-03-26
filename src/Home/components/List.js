import { v4 } from "uuid";

const List = ({ word, saveWord }) => {

    function saveWords(e) {
        let w = e.target.parentNode.getAttribute("id")

        saveWord(function (prevData) {

            return [
                ...prevData,
                w
            ];
        });

    }
    let result = []

    if (word[1] == "rhyme") {
        result.push(<h1 key={v4()}>Words that rhyme with : {word[0]}</h1>)
        if (word[2]=="no result"){
            result.push(<div key={v4()}>{word[2]}</div>)
        }else{
            
            for (let i = 1; i <= Object.keys(word[2]).length; i++) {
                let wordList = []
                result.push(<h3 key={v4()}> Syllables: {i} </h3>)
                for (let j = 1; j <word[2][i].length; j++) {
                    wordList.push(word[2][i][j]['word'])
                }
                result.push(<ul>{wordList.map((w) => <li id={w} key={v4()}>{w}<button onClick={saveWords} type="button" className="btn btn-success btn-sm"> (save) </button></li>)}</ul>)
            }
        }
        
    }
    else if (word[1] == "similar"){
        result.push(<h1 key={v4()}>Words that similar to : {word[0]}</h1>)
        if(word[2]=="no result"){
            result.push(<div key={v4()}>{word[2]}</div>)
        }
        else{
            
            let wordList = []
            
            for (let i = 0; i < Object.values(word[2]).length; i++) {
                wordList.push(word[2][i]['word'])
            }
    
            result.push(<ul>{wordList.map((w) => <li id={w} key={v4()}>{w}<button onClick={saveWords} type="button" className="btn btn-success btn-sm"> (save) </button></li>)}</ul>)
    
        }
       
    }
    
    return (
        <div>
            {result}
        </div>
    );
};

export default List;
