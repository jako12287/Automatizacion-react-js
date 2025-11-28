import "./App.css";
import { BotControlPanel } from "./components/09-contextWithReducer";
// import UsersPanel from "./components/07-users-panel";
import { BotProvider } from "./store/bot.context";

function App() {
  return (
    <div className="app">
      {/* <GlobalProvider> */}

      {/* <Clock /> */}
      {/* <AutoFocus/> */}
      {/* <MouseLocation /> */}
      {/* <AutoPause /> */}
      {/* <FetchApi/> */}
      {/* <SearchWithAbortController/> */}
      {/* <UsersPanel/> */}
      {/* <ContextUse/>
      </GlobalProvider> */}
      <BotProvider>
         <h1>Dashboard de Automatizaciones (Mock)</h1>
      <BotControlPanel/>
    </BotProvider>
    </div>
  );
}

export default App;
