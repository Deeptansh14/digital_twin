import React, { useState } from "react";
import './Board.css';
import Cell from "../Cell/Cell";

const Board = ({ baseRows, baseCols, overlayRows, overlayCols }) => {

    // Function to create a grid with specified rows and columns
    const createGrid = (rows, cols) => 
        new Array(rows)
            .fill()
            .map(() => 
                new Array(cols)
                .fill()
                .map(() => Math.random() < 0.0) // Adjust probability as needed
            );

    // Initialize both grids
    const [baseBoard, setBaseBoard] = useState(createGrid(baseRows, baseCols));
    const [overlayBoard, setOverlayBoard] = useState(createGrid(overlayRows, overlayCols));

    // Toggle logic for a cell
    const toggleLights = (row, col, isOverlay = false) => {
        if (isOverlay) {
            const copy = [...overlayBoard.map(r => [...r])];
            copy[row][col] = !copy[row][col];
            setOverlayBoard(copy);
        } else {
            const copy = [...baseBoard.map(r => [...r])];
            copy[row][col] = !copy[row][col];
            setBaseBoard(copy);
        }
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
                            toggleLights={(row, col) => toggleLights(row, col)}
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
                            toggleLights={(row, col) => toggleLights(row, col, true)}
                        />
                    ))
                ))}
            </div>
        </div>
    );
};

export default Board;
