(() => {
  const form = document.getElementById("lfForm");
  const btn = document.getElementById("lfBtn");
  const ok = document.getElementById("lfOk");
  const err = document.getElementById("lfErr");

  const show = (el) => el.classList.remove("d-none");
  const hide = (el) => el.classList.add("d-none");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    hide(ok);
    hide(err);

    if (!form.checkValidity()) {
      show(err);
      form.classList.add("was-validated");
      return;
    }

    btn.disabled = true;
    const oldText = btn.innerText;
    btn.innerText = "Enviando...";

    try {
      // Simulación de envío (puedes reemplazar por tu backend o EmailJS)
      await new Promise((r) => setTimeout(r, 800));
      show(ok);
      form.reset();
      form.classList.remove("was-validated");
    } catch {
      show(err);
    } finally {
      btn.disabled = false;
      btn.innerText = oldText;
    }
  });
})();
