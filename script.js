document.addEventListener("DOMContentLoaded", function () {
  const tooltip = document.getElementById("tooltip");
  const tooltipText = document.getElementById("tooltip-text");
  const closeBtn = document.getElementById("close-tooltip");

  document.querySelectorAll(".course").forEach(course => {
    course.addEventListener("click", () => {
      const prereq = course.dataset.prereq || "Sin prerrequisitos";
      tooltipText.textContent = `Prerrequisitos: ${prereq}`;
      tooltip.classList.remove("hidden");
    });
  });

  closeBtn.addEventListener("click", () => {
    tooltip.classList.add("hidden");
  });

  // Cierra el tooltip si se hace clic fuera de él
  document.addEventListener("click", function(e) {
    if (!tooltip.contains(e.target) && !e.target.classList.contains("course")) {
      tooltip.classList.add("hidden");
    }
  });
});
