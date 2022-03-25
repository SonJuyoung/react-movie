import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Detail.module.css";

const Detail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          <div className={styles.movies}>
            <img src={movie.medium_cover_image} />
          </div>
          <div>
            <h3 className={styles.box}>
              <a className={styles.moreInfo} target={"_blank"} href={movie.url}>
                More Info
              </a>
            </h3>

            <div className={styles.box}>
              <button
                className={styles.btn}
                onClick={() => {
                  navigate("/");
                }}
              >
                뒤로 가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
