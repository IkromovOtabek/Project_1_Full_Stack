export const serverApi: string = process.env.REACT_APP_API_URL ?? "";

if (!serverApi) {
  // CRA env o‘zgarganda dev server restart talab qiladi.
  // serverApi bo‘sh bo‘lsa requestlar noto‘g‘ri joyga ketadi.
  // eslint-disable-next-line no-console
  console.error(
    "REACT_APP_API_URL is missing. Create .env with REACT_APP_API_URL and restart dev server.",
  );
}

export const Messages = {
    error1: "Something went wrong",
    error2: "Please login first",
    error3: "Please fulfill all inputs!",
    error4: "Message is empty!",
    error5: "Only images with .jpg, .jpeg, .png format allowed!",
}