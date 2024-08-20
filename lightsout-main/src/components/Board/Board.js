import React, { useState, useEffect } from "react";
import './Board.css';
import Cell from "../Cell/Cell";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const baseToOverlayMap = {
  1: 'A', 2: 'A', 3: 'A', 4: 'A', 13: 'A', 14: 'A', 15: 'A', 16: 'A',
  5: 'B', 6: 'B', 7: 'B', 8: 'B', 17: 'B', 18: 'B', 19: 'B', 20: 'B',
  9: 'C', 10: 'C', 11: 'C', 12: 'C', 21: 'C', 22: 'C', 23: 'C', 24: 'C',
  25:'D', 26:'D', 27:'D', 28:'D', 29:'E', 30:'E', 31:'E', 32:'E', 33:'F', 34:'F', 35:'F', 36:'F',
  37:'G', 38:'G', 39:'G', 40:'G', 41:'H', 42:'H', 43:'H', 44:'H', 45:'I', 46:'I', 47:'I', 48:'I',
  49:'J', 50:'J', 51:'J', 52:'J', 53:'K', 54:'K', 55:'K', 56:'K', 57:'L', 58:'L', 59:'L', 60:'L',
};

const Board = ({ baseRows, baseCols, overlayRows, overlayCols }) => {
    const createGrid = (rows, cols) => 
        new Array(rows)
            .fill()
            .map(() => 
                new Array(cols)
                .fill()
                .map(() => false)
            );

    const [baseBoard, setBaseBoard] = useState(createGrid(baseRows, baseCols));
    const [overlayBoard, setOverlayBoard] = useState(createGrid(overlayRows, overlayCols));

    useEffect(() => {
        socket.on('updateLight', ({ lightId, status }) => {
            updateOverlayBoard();
        });
    }, [baseBoard]);

    const updateOverlayBoard = () => {
        const overlayMapping = {
            "A": 0, "B": 1, "C": 2,
            "D": 3, "E": 4, "F": 5,
            "G": 6, "H": 7, "I": 8,
            "J": 9, "K": 10, "L": 11
        };

        const copy = [...overlayBoard.map(r => [...r])];

        Object.keys(overlayMapping).forEach(lightId => {
            const row = Math.floor(overlayMapping[lightId] / overlayCols);
            const col = overlayMapping[lightId] % overlayCols;

            // Check the status of all base cells corresponding to this overlay light
            const baseCells = Object.keys(baseToOverlayMap)
                .filter(key => baseToOverlayMap[key] === lightId)
                .map(key => {
                    const baseRow = Math.floor((key - 1) / baseCols);
                    const baseCol = (key - 1) % baseCols;
                    return baseBoard[baseRow][baseCol];
                });

            // If at least one corresponding base cell is on, turn on the overlay light
            const isOn = baseCells.some(cell => cell);

            copy[row][col] = isOn;
        });

        setOverlayBoard(copy);
    };

    const toggleLights = (row, col) => {
        const copy = [...baseBoard.map(r => [...r])];
        copy[row][col] = !copy[row][col];
        setBaseBoard(copy);

        // Emit event to the server
        const benchId = row * baseCols + col + 1;
        socket.emit('benchClicked', { benchId });

        // Update overlay grid state based on new base grid state
        updateOverlayBoard();
    };

    return (
        <div className="Board">
            {/* Base Grid */}
            <div className="grid-overlay">
                {baseBoard.map((row, rowIndex) => (
                    row.map((_, colIndex) => (
                        <Cell 
                            key={`${rowIndex}-${colIndex}`}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            isOn={baseBoard[rowIndex][colIndex]}
                            toggleLights={() => toggleLights(rowIndex, colIndex)}
                        />
                    ))
                ))}
            </div>

            {/* Overlay Grid */}
            <div className="overlay-grid">
                {overlayBoard.map((row, rowIndex) => (
                    row.map((_, colIndex) => (
                        <Cell 
                            key={`${rowIndex}-${colIndex}-overlay`}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            isOn={overlayBoard[rowIndex][colIndex]}
                        />
                    ))
                ))}
            </div>
        </div>
    );
};

export default Board;
