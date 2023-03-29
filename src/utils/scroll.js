export const isBtnShow = () => {
  const B = document.body;
  let D = document.documentElement;
  D = D.clientHeight ? D : B;
  if (D.scrollTop === 0) {
    return false;
  }
  const scrollY = window.scrollY;
  const res = scrollY > 400;
  return res;
};

export const scroll2Top = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
