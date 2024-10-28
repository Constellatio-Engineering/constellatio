export const scrollTo = (element: HTMLElement, offset = 100): void =>
{
  const y = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ behavior: "smooth", top: y });
};

export const scrollToTop = (): void =>
{
  window.scrollTo({ behavior: "smooth", top: 0 });
};