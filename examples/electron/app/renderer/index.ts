/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import { ipcRenderer } from "electron";
import { nanoid } from "nanoid";

import "./index.css";

const form = document.querySelector("form") as HTMLFormElement;
const input = document.querySelector("input") as HTMLInputElement;
const list = document.querySelector("ul") as HTMLElement;

const render = (text: string) => {
  const li = document.createElement("li");
  const div = document.createElement("div");
  const btn = document.createElement("button");

  div.innerText = text;
  btn.innerText = "delete";
  li.dataset.key = nanoid();

  li.appendChild(div);
  li.appendChild(btn);

  return li;
};

window.addEventListener("load", () => ipcRenderer.send("@todo/loadAll"));

ipcRenderer.on("@todo/loaded", (_, items) => {
  const fragment = document.createDocumentFragment();

  items.forEach((text: string) => {
    const li = render(text);
    fragment.appendChild(li);
  });

  list.appendChild(fragment);
});

form.addEventListener("submit", e => {
  e.preventDefault();
  ipcRenderer.send("@todo/add", input.value);
  form.reset();
});

ipcRenderer.on("@todo/added", (_, text) => {
  list.appendChild(render(text));
});

list.addEventListener(
  "click",
  (event: any) => {
    const target = event.target;

    if (target.nodeName.toLocaleLowerCase() === "button") {
      ipcRenderer.send("@todo/remove", target.parentNode.dataset.key);
    }
  },
  false,
);

ipcRenderer.on("@todo/removed", (_, key) => {
  const liArr = Array.from(list.children);

  for (let i = 0; i < liArr.length; i++) {
    const li = liArr[i] as HTMLElement;

    if (key === li.dataset.key) {
      list.removeChild(li);
      break;
    }
  }
});

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack',
);
