import { register, login, startGoogleLogin } from "./api.js";

const AFTER_LOGIN = "dashboard.html";
const MIN_PASSWORD = 10;

const shell = document.getElementById("shell");
const title = document.getElementById("title");
const lead = document.getElementById("lead");
const alertBox = document.getElementById("alert");
const form = document.getElementById("authForm");
const submitBtn = document.getElementById("submitBtn");
const pwd = document.getElementById("password");
const toggle = document.getElementById("togglePwd");

let mode = "login";

function setMode(next) {
  mode = next;
  const signup = mode === "signup";
  shell.classList.toggle("is-signup", signup);
  title.textContent = signup ? "Criar sua conta" : "Entrar no RENO";
  lead.textContent = signup
    ? "Leva menos de um minuto."
    : "Use sua conta Google ou e-mail para continuar.";
  submitBtn.textContent = signup ? "Criar conta com e-mail" : "Entrar com e-mail";
  pwd.autocomplete = signup ? "new-password" : "current-password";
  hideAlert();
}

function showAlert(message, ok = false) {
  alertBox.textContent = message;
  alertBox.classList.toggle("ok", ok);
  alertBox.classList.add("show");
}

function hideAlert() {
  alertBox.classList.remove("show");
}

function validate(data) {
  if (mode === "signup" && !data.name.trim()) return "Informe seu nome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "Informe um e-mail válido.";
  if (!data.password) return "Informe sua senha.";
  if (mode === "signup" && data.password.length < MIN_PASSWORD)
    return `A senha precisa ter pelo menos ${MIN_PASSWORD} caracteres.`;
  return null;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  hideAlert();

  const fd = new FormData(form);
  const data = {
    name: String(fd.get("name") ?? ""),
    email: String(fd.get("email") ?? "").trim().toLowerCase(),
    password: String(fd.get("password") ?? ""),
  };

  const error = validate(data);
  if (error) return showAlert(error);

  submitBtn.disabled = true;
  try {
    if (mode === "signup") {
      const res = await register({ name: data.name.trim(), email: data.email, password: data.password });
      if (res.status === 429) return showAlert("Muitas tentativas. Aguarde alguns minutos.");
      if (res.status === 422) return showAlert("Revise os dados informados.");
      showAlert("Se o endereço estiver disponível, sua conta foi criada. Entre para continuar.", true);
      setMode("login");
    } else {
      const res = await login({ email: data.email, password: data.password });
      if (res.status === 429) return showAlert("Muitas tentativas. Aguarde alguns minutos.");
      if (!res.ok) return showAlert("E-mail ou senha inválidos.");
      window.location.href = AFTER_LOGIN;
    }
  } catch {
    showAlert("Não foi possível conectar. Verifique sua conexão e tente novamente.");
  } finally {
    submitBtn.disabled = false;
  }
});

toggle.addEventListener("click", () => {
  const show = pwd.type === "password";
  pwd.type = show ? "text" : "password";
  toggle.textContent = show ? "Ocultar" : "Mostrar";
});

document.getElementById("googleBtn").addEventListener("click", startGoogleLogin);
document.getElementById("toSignup").addEventListener("click", (e) => { e.preventDefault(); setMode("signup"); });
document.getElementById("toLogin").addEventListener("click", (e) => { e.preventDefault(); setMode("login"); });

setMode("login");