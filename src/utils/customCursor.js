// Lightweight custom cursor: trailing dot + click ripple + hover grow
// Respects prefers-reduced-motion and coarse pointers (touch)
export function initCustomCursor({
  interactiveSelector = "a,button,.btn,.project-cta",
} = {}) {
  if (typeof window === "undefined") return;

  // Respect user preferences and touch devices
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches)
    return;

  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  const ripple = document.createElement("div");
  ripple.className = "cursor-ripple";
  document.body.appendChild(ripple);

  let mouseX = 0;
  let mouseY = 0;
  let posX = 0;
  let posY = 0;
  const speed = 0.16; // damping: lower = smoother/laggier
  let rafId = null;

  function loop() {
    posX += (mouseX - posX) * speed;
    posY += (mouseY - posY) * speed;
    // center the element by translating to the coords
    cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
    rafId = requestAnimationFrame(loop);
  }
  rafId = requestAnimationFrame(loop);

  function onMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
  window.addEventListener("mousemove", onMove, { passive: true });

  function onDown(e) {
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    ripple.classList.remove("ripple-animate");
    // force reflow to restart animation
    // eslint-disable-next-line no-unused-expressions
    ripple.offsetWidth;
    ripple.classList.add("ripple-animate");
  }
  window.addEventListener("pointerdown", onDown);

  // Hover detection (delegated) so dynamically-added elements work too
  let lastHover = null;
  function onOver(e) {
    const target =
      e.target && e.target.closest
        ? e.target.closest(interactiveSelector)
        : null;
    if (target && lastHover !== target) {
      cursor.classList.add("cursor--hover");
      lastHover = target;
    }
  }
  function onOut(e) {
    // If leaving to another interactive element, keep hover; otherwise remove
    const related = e.relatedTarget;
    if (!related || !related.closest || !related.closest(interactiveSelector)) {
      cursor.classList.remove("cursor--hover");
      lastHover = null;
    }
  }
  document.addEventListener("mouseover", onOver, true);
  document.addEventListener("mouseout", onOut, true);

  // Cleanup function to remove listeners and DOM nodes
  function cleanup() {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("pointerdown", onDown);
    document.removeEventListener("mouseover", onOver, true);
    document.removeEventListener("mouseout", onOut, true);
    if (rafId) cancelAnimationFrame(rafId);
    if (cursor && cursor.parentNode) cursor.parentNode.removeChild(cursor);
    if (ripple && ripple.parentNode) ripple.parentNode.removeChild(ripple);
  }

  return cleanup;
}
