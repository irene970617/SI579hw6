import { useState } from "react";
const Input = ({ search }) => {

    const [note, setNote] = useState("");
    function noteChange(e) {
        setNote(e.target.value);
    }

    function groupBy(objects, property) {
        if (typeof property !== 'function') {
            const propName = property;
            property = (obj) => obj[propName];
        }

        const groupedObjects = new Map();
        for (const object of objects) {
            const groupName = property(object);

            if (!groupedObjects.has(groupName)) {
                groupedObjects.set(groupName, []);
            }
            groupedObjects.get(groupName).push(object);
        }

        const result = {};
        for (const key of Array.from(groupedObjects.keys()).sort()) {
            result[key] = groupedObjects.get(key);
        }
        return result;
    }

    function datamuseRequest(url, callback) {

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                callback(data);
            }, (err) => {
                console.error(err);
            });
    }

    function getDatamuseRhymeUrl(rel_rhy) {
        return `https://api.datamuse.com/words?${(new URLSearchParams({ 'rel_rhy': note })).toString()}`;
    }

    function getDatamuseSimilarToUrl(ml) {
        return `https://api.datamuse.com/words?${(new URLSearchParams({ 'ml': note })).toString()}`;
    }


    function searchRhymes() {

        datamuseRequest(getDatamuseRhymeUrl(), (rhymeData) => {
            if (rhymeData.length == 0) {
                return search(function () {
                    return [note, 'rhyme', 'no result']
                })
            }
            const object = groupBy(rhymeData, 'numSyllables')

            return search(function () {
                return [note, 'rhyme', object]
            })
        })


    }

    function searchSimilar() {
        datamuseRequest(getDatamuseSimilarToUrl(), (similarData) => {
            if (similarData.length == 0) {
                return search(function () {
                    return [note, 'similar' ,'no result']
                })
            }

            return search(function () {
                return [note, 'similar', similarData]
            })
        })

    }

    return (
        <div>
            <div className="input-group col">
                <input className="form-control" type="text" value={note} onChange={noteChange} placeholder="Enter a word" id="word_input" />
                <button onClick={searchRhymes} id="show_rhymes" type="button" className="btn btn-primary">Show rhyming words</button>
                <button onClick={searchSimilar} id="show_synonyms" type="button" className="btn btn-secondary">Show synonyms</button>
            </div>
        </div>
    );
};

export default Input;

