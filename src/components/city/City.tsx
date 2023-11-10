import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useCityContext } from "../../store/CityContext";

import { flagemojiToPNG, formatDate } from "../../helpers/functions";

import Message from "../ui/Message";
import Spinner from "../ui/Spinner";
import BackButton from "../ui/BackButton";

import styles from "./City.module.css";

function City() {
  const { id } = useParams();

  const { selectedCity, isLoading, handleSelectCity } = useCityContext();
  useEffect(
    function () {
      if (id) {
        handleSelectCity(id);
      }
    },
    [id, handleSelectCity]
  );

  if (isLoading) return <Spinner />;
  if (!selectedCity) return <Message message="City not found" />;
  const { cityName, emoji, date, notes } = selectedCity;
  const transformedEmoji = flagemojiToPNG(emoji);

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>
            {transformedEmoji && (
              <img
                src={`https://flagcdn.com/24x18/${transformedEmoji}.png`}
                alt="country"
              />
            )}
          </span>{" "}
          {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
