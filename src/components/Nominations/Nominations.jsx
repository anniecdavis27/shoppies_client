import React, { useEffect } from "react";
import axios from "axios";

const Nominations = ({ getNominatedList, nominated }) => {
  useEffect(() => {
    getNominatedList();
  }, []);

  const removeNomination = async (unnominated) => {
    try {
      await axios.delete(`http://localhost:3000/movies/${unnominated.id}`);
      getNominatedList();
    } catch (err) {
      console.error("Couldn't delete song from nominated list", err);
    }
  };

  let displayNominated;
  if (!nominated.length) {
    displayNominated = null;
  } else if (nominated[0]) {
    displayNominated = nominated.map((movie, index) => {
      // console.log("map nom", movie);
      return (
        <li className="nominatedMovie" key={index}>
          <span>{movie.Title}</span>
          <span>({movie.Year})</span>
          <button onClick={() => removeNomination(movie)}>Remove</button>
        </li>
      );
    });
  }
  return (
    <div>
      <p>Nominations</p>
      <ul>{displayNominated}</ul>
    </div>
  );
};

export default Nominations;
