import { useEffect, useRef, useState } from "react";

const AutoPause = () => {
  const limit = 5;
  const [count, setCount] = useState<number>(0);
  const [pause, setPause] = useState<boolean>(false);

  const refListen = useRef<number | null>(null);

  useEffect(() => {
    if (pause) return;

    if (count >= limit) return;

    const counter = window.setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    refListen.current = counter;

    return () => {
      clearInterval(counter);
      refListen.current = null;
    };
  }, [pause, count]);

  const handleReset = () => {
    if (refListen.current !== null) {
      clearInterval(refListen.current);
      refListen.current = null;
    }
    setCount(0);
    setPause(false);
  };

  return (
    <div>
      <h1>Auto Pausa</h1>
      <div>
        <p>
          contador:{count} Se pausara al llegar al numero {limit}
        </p>
        <h2>Estado del contador</h2>
        {count >= limit ? (
          <p>Contador detenido porque llego al limite</p>
        ) : (
          <p>{pause ? "Pausado" : "Escuchando..."}</p>
        )}
      </div>
      <div>
        <button onClick={() => setPause(!pause)} disabled={count >= limit}>
          {pause ? "Reanudar" : "Pausar"}
        </button>
        <button onClick={handleReset}>Reiniciar</button>
      </div>
    </div>
  );
};

export default AutoPause;
