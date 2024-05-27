import { useEffect, useState } from "react";
import ScratchItem from "../../atoms/scratch-item";
import CircleImage from "../../../resources/circle.png";
import CrossImage from "../../../resources/x.png";
import LineImage from "../../../resources/line.png";
import axios from "axios";

const ScratchBoard = () => {

    const [scratchItems, setScratchItems] = useState([]);
    const [scratchedItems, setScratchedItems] = useState([]);
    const [limitScratched, setLimitScratched] = useState(1);

    const sendScratched = () => {
        axios.post('http://localhost:3001/proxypost', {
            hits: scratchedItems
        }).then(response => {
            const rows = response.data.board.split(';');
            const results = [];
            rows.map((item) => {
                results.push(item.trim().split(" "));
            })
            setScratchItems(results);
            console.log(results);
            let mensaje = 'Perdiste!';
            if (response.data.winner && response.data.boardWinner) {
                mensaje = 'winner - boardWinner'
            } else if (response.data.winner) {
                mensaje = 'winner'
            } else if (response.data.boardWinner) {
                mensaje = 'boardWinner'
            }
            alert(mensaje);
            setLimitScratched(limitScratched + 1);
        }).catch(error => console.log(error));

    }

    const handleScratched = (position) => {
        const scratchedItemsCopy = [...scratchedItems];
        if (!scratchedItemsCopy.find(item => item[0] === position[0] && item[1] === position[1]) && scratchedItems.length < limitScratched) {
            scratchedItems.push(position);

        }
        setScratchedItems(scratchedItemsCopy);
    };

    const getImage = (row, column) => {
        const scratchItem = scratchItems[column][row];
        if (scratchItem) {
            return scratchItem === 'x' ? CrossImage : scratchItem === 'o' ? CircleImage : LineImage;
        }
        return null;
    };

    useEffect(() => {
        /*setScratchItems([
            ['x', 'x', 'o','-'],
            ['-', '-', '-', '-'],
            ['x', 'o', '-', '-'],
            ['x', 'o', '-', '-'],
        ]);*/
    }, []);


    const getBoard = () => {
        setScratchItems([]);
        setScratchedItems([]);
        axios.get('http://localhost:3001/proxy', {
            headers: {
                'H-Owner': 'test',
                'X-Tiger-Token': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjRmY2ZiZjEyLWY2ODUtNDI5NS1iOTIwLWFhMWNkMTUyYzI0NCIsInR5cCI6IkpXVCJ9.eyJhZGRpdGlvbmFsX2luZm8iOnsiZW1haWwiOiJqaG9uYXRhbi5yZWFscGVAbWVyY2Fkb2xpYnJlLmNvbS5jbyIsImVudmlyb25tZW50IjoiTWVyY2Fkb0xpYnJlIiwiZnVsbF9uYW1lIjoiSmhvbmF0YW4gUmVhbHBlIEJ1cmJhbm8iLCJ0eXBlIjoidXNlciIsInVzZXJuYW1lIjoianJlYWxwZSJ9LCJleHAiOjE3MTQwODY5MjYsImlhdCI6MTcxNDA1NDUyNiwiaWRlbnRpdHkiOiJtcm46c2VnaW5mOmFkOnVzZXIvanJlYWxwZSIsImlzcyI6ImZ1cnlfdGlnZXIiLCJzdWIiOiJqcmVhbHBlIn0.eSH687uq1oYL-UpzoVcsyxQrA7zEkJOTUg9iCJfyrgFSYgwCzkI8AYQ4iXV4r3uHDZ9o8ssCiCrWQF1aZZ3XKXAReuYndUkD-WTrTbds00CsweRL81MhonmytGMilTEY3WwKXsvil-joBrajZRD0J7uyAZAPQPw5CmWmN4kisiIaMGrhsaiWdrdgjUHi9YRseB1ZDPWo6D73vyGVR1HAntBvTEeFZfKTCo6h0PP8gjYX9N4HTgsK_pryIYz6kNxgLAWj28Ff-DTLAUL-cuN3USNc7n5IQW12KRjzO1D7_bFWX_nT41V7dkyGbL93MZiE9gZILq214J2OpafIiZOwxA'
            }
        }).then(response => {
            const scratchItemsAux = Array.from({ length: response.data.cols }, () => Array.from({ length: response.data.rows }, () => '-'));
            setScratchItems(scratchItemsAux);
            setLimitScratched(response.data.scratched);
        }).catch(error => {
            console.log(error);
        });
    }


    return (
        <div className="scratch-board-container">
            <div className="scratch-board" style={{ width: `${150 * scratchItems.length + 150}px`, height: `${150 * scratchItems.length}px` }}>
                {scratchItems.map((position, row) => (
                    <div className="col">
                        {position.map((_, column) => <ScratchItem image={getImage(row, column)} id={`${row + 1}-${column + 1}`} onScratched={() => handleScratched([column + 1, row + 1])} />)}
                    </div>
                ))}
            </div>

            {scratchedItems?.length < limitScratched ? <button className="button" onClick={getBoard}>Obtener Tablero</button>
                : <button className="buttontwo" onClick={() => sendScratched()}>Enviar Tablero</button>}
        </div>
    );
};

export default ScratchBoard;