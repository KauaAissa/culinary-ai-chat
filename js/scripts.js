// Efeito de iluminação suave que segue o mouse
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;

  document.body.style.background = `
    radial-gradient(circle at ${x}% ${y}%, #fffaf3, #f2e7d5, #e6d5b8)
  `;
});

// Enviar mensagem ao pressionar Enter
document.getElementById("input").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault(); // evita quebra de linha
    sendMessage();
  }
});
