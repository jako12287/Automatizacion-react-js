import { useEffect, useRef, useState } from "react";

const AutoFocus = () => {
  const [count, setCount] = useState<number>(0);
  const [pause, setPause] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const refInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    refInput.current?.focus();
  }, []);

  useEffect(() => {
    if (!pause) {
      timerRef.current = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [pause]);

  return (
    <div>
      <h1>autofocus + contador</h1>
      <label className="group">
        Input de autofocus
        <input type="text" name="inputAuto" ref={refInput} />
      </label>

      <p>{count}</p>

      <div>
        <button onClick={() => setPause(true)} disabled={pause}>
          Pause
        </button>
        <button onClick={() => setPause(false)} disabled={!pause}>
          Reanudar
        </button>
      </div>
    </div>
  );
};

export default AutoFocus;
