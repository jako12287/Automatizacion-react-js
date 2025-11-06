import { useEffect, useRef, useState } from "react";

const MouseLocation = () => {
  const [mouselocation, setMouseLocation] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [listening, setListening] = useState<boolean>(false);

  const listenerRef = useRef<((e: MouseEvent) => void) | null>(null);

  useEffect(() => {
    if (!listening) {
      return;
    }

    const handler = (e: MouseEvent) => {
      setMouseLocation({ x: e.clientX, y: e.clientY });
    };

    listenerRef.current = handler;

    window.addEventListener("mousemove", handler);

    return () => {
      window.removeEventListener("mousemove", handler);
      listenerRef.current = null;
    };
  }, [listening]);

  return (
    <div>
      <h1>Mouse location</h1>
      <p>{mouselocation ? JSON.stringify(mouselocation) : "Sin datos aún"}</p>
      <div>
        <button onClick={() => setListening(true)} disabled={listening}>
          Escuchar
        </button>
        <button onClick={() => setListening(false)} disabled={!listening}>
          Detener
        </button>
      </div>
    </div>
  );
};

export default MouseLocation;
