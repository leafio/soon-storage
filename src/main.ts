import "./style.css";
import typescriptLogo from "./typescript.svg";
// import { createLocalStorage } from "../lib/index";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;
// const initData = {
//   goods: {
//     name: "pen",
//     amount: 10,
//   },
//   lang: "zh",
// };
// const storage = createLocalStorage<{
//   goods?: {
//     name: string;
//     amount: number;
//   };
//   lang?: string;
// }>();
// const lang = storage.getItem("lang");
// storage.setItem("lang",);
// const goods = storage.getItem("goods");
// goods?.amount;
// storage.setItem('goods',)

// localStorage.setItem("jjj", null);



// const storage = createLocalStorage<{
//   goods?: {
//     name: string;
//     amount: number;
//   };
//   username: string;
// }>();
// const goods=storage.getItem('')






// storage.setItem('goods',)