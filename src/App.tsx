import { useEffect, useRef, useState } from "react";
import "./App.css";

const formateTime = (date: Date): string => {
  let h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const ampm = h >= 12 ? "PM" : "AM";

  h = h % 12;
  if (h === 0) {
    h = 12;
  }

  const mm = m < 10 ? `0${m}` : `${m}`;
  const ss = s < 10 ? `0${s}` : `${s}`;
  return `${h}:${mm}:${ss} ${ampm}`;
};

function App() {
  const [paused, setPause] = useState<boolean>(false);
  const [now, setNow] = useState<Date>(() => new Date());

  const timeRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeRef.current !== null) {
      clearInterval(timeRef.current);
      timeRef.current = null;
    }

    if (paused) {
      return;
    }

    timeRef.current = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      if (timeRef.current !== null) {
        clearInterval(timeRef.current);
        timeRef.current = null;
      }
    };
  }, [paused]);

  return (
    <div className="app">
      <h1>RELOJ</h1>
      <div>
        <p style={{ color: `${paused ? "red" : "green"}` }}>
          {formateTime(now)}
        </p>
        <div className="containerbuttons">
          <button
            onClick={() => {
              setPause(true);
            }}
            disabled={paused}
          >
            Pausar
          </button>
          <button
            onClick={() => {
              setPause(false);
            }}
            disabled={!paused}
          >
            Reanudar
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
