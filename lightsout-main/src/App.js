import './App.css';
import Board from './components/Board/Board';

const App = () => {
    return (
        <div className="App">
            <h1 class="heading">White Board</h1>
            <Board baseRows={5} baseCols={12} overlayRows={4} overlayCols={3} />
            
        </div>
    );
}

export default App;