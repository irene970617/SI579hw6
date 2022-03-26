function Save({ save }) {
    let string = Object.values(save).map((item) => item).join(",")
    return (
        <div>Saved words: {string}</div>
    )

};

export default Save;