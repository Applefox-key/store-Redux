export const toCartAnimation = (item) => {
  let el = document.getElementById("img" + item.id);
  if (el) {
    const el1 = document.getElementById("imgDiv" + item.id);
    el1.classList.add("toCartAnimationMove");
    el.classList.add("toCartAnimationScale");
    setTimeout(() => {
      el1.classList.remove("toCartAnimationMove");
      el.classList.remove("toCartAnimationScale");
    }, 1000);
  } else {
    el = document.getElementById("imgS" + item.id);
    const el1 = document.getElementById("imgDivS" + item.id);
    el1.classList.add("toCartAnimationMoveS");
    el.classList.add("toCartAnimationScale");
    setTimeout(() => {
      el1.classList.remove("toCartAnimationMoveS");
      el.classList.remove("toCartAnimationScale");
    }, 1000);
  }
};
