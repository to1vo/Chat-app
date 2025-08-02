import { useRef, useState, useEffect } from "react";

function Input({ setUsername, setColor, color }) {
    const [colorSelect, setColorSelect] = useState(false);
    const inputRef = useRef(null);
    const colorSelectRef = useRef(null);
    const colorSelectBtnRef = useRef(null);

    useEffect(() => {
        const handleMouseDown = (e) => {
            if(!colorSelectRef.current.contains(e.target) && e.target !== colorSelectBtnRef.current){
                setColorSelect(false);
            }
        }

        document.addEventListener("mousedown", handleMouseDown);

        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
        }
    }, []);

    const handleUsername = (username) => {
        const name = username.trim();
        //if no name given/empty input
        if(name === "") return;
        setUsername(name);
    }

    const handleColorSelect = () => {
        //toggle color selection div
        setColorSelect(prev => prev = !prev);
    } 

    const handleColorChange = (colorName, e) => {
        const currentColor = document.querySelector(".selectable-color.active");
        currentColor.classList.remove("active");
        e.target.classList.add("active");
        setColor(colorName);
    }

    return (
        <>
        <h1>Give your username</h1>
        <div className="input-container">
            <div id="name-color-selection">
                <input type="text" ref={inputRef} />
                <div 
                ref={colorSelectBtnRef} 
                id="color-select" 
                onClick={handleColorSelect}
                style={{
                    backgroundColor: `${color}`
                }}
                ></div>
            </div>
            <div ref={colorSelectRef} className={colorSelect ? "color-select-popup active" : "color-select-popup"}>
                <div 
                className="selectable-color active"
                onClick={() => handleColorChange("#ff0000", event)}
                style={{
                    width: "25px",
                    height: "25px",
                    backgroundColor: "#ff0000",
                }}>
                </div>
                <div 
                className="selectable-color"
                onClick={() => handleColorChange("#fcba03", event)}
                style={{
                    width: "25px",
                    height: "25px",
                    backgroundColor: "#fcba03"
                }}>
                </div>
                <div 
                className="selectable-color"
                onClick={() => handleColorChange("#ce03fc", event)}
                style={{
                    width: "25px",
                    height: "25px",
                    backgroundColor: "#ce03fc"
                }}>
                </div>
            </div>
            <button onClick={() => handleUsername(inputRef.current.value)}>Go</button>
        </div>
        </>
    )
}

export default Input;