import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const targetDate = new Date("2026-06-09T10:00:00+02:00");

  const calculateTimeLeft = () => {
	const difference = targetDate.getTime() - Date.now();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),
      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="maintenance-page">
      <div className="maintenance-card">
		<img src="flyer3.png" className="flyer-front"></img>
        <h1>Sivustoa päivitetään</h1>

        <p>
          Sivusto on tilapäisesti poissa käytöstä huolto- ja
          päivitystöiden vuoksi.
        </p>

        <div className="countdown">
          <div className="countdown-item">
            <span>{timeLeft.days}</span>
            <small>päivää</small>
          </div>

          <div className="countdown-item">
            <span>{timeLeft.hours}</span>
            <small>tuntia</small>
          </div>

          <div className="countdown-item">
            <span>{timeLeft.minutes}</span>
            <small>minuuttia</small>
          </div>
        </div>

        <p className="maintenance-date">
          Arvioitu valmistumisaika:
          <br />
          9.6.2026 klo 10:00 (GMT+2)
        </p>
      </div>
    </div>
  );
}