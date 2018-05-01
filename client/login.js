import { checkStatus, parseJSON } from "../shared/utils";
import { onRequestPlay } from "./connection";
const loginForm = document.getElementById("loginForm");

loginForm.onsubmit = async evt => {
  evt.preventDefault();

  const submitButton = /** @type {HTMLButtonElement} */ (document.getElementById(
    "loginForm_submit"
  ));
  const email = /** @type {HTMLInputElement} */ (document.getElementById(
    "loginForm_email"
  ));
  const password = /** @type {HTMLInputElement} */ (document.getElementById(
    "loginForm_password"
  ));

  submitButton.classList.add("btn-loading");
  try {
    const { token, user } = await fetch(`/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
      .then(checkStatus)
      .then(parseJSON);

    const loginPage = document.getElementById("loginPage");
    loginPage.classList.add("fade");
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
    //@ts-ignore
    onRequestPlay(token);
  } catch (err) {
    alert(err.response.message);
  }
  submitButton.classList.remove("btn-loading");
  return false;
};
