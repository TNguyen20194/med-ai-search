import "./App.css";
import MedSearchBar from "./components/MedSearchBar/MedSearchBar";

function App() {
  return (
    <>
      <MedSearchBar />
    </>
  );
}

export default App;

/**
 * 
 * 
 * given an array of characters A [|a, a, b, a, c, b, c, a, d, a, , c]
 *  and a set S {a, b, c, d}

 * Find the smallest sub-array of A that contains every character in S
 * : Can assume that A contains every character of S.
 * 
 * 
 * - array characters -> 
 * - set of characters -> set is a unique array of characters
 * 
 * - find smallest piece ( sub array ) in A that containes all of S ( set )
 * - subarray is a slice of the original array that doesnt change order of any characters
 * 
 * 1. check slice of array with indexes 0 to size of set and increment until found or at end
 * 2. if not found increment end index and check again until found
 * 
 
 */
