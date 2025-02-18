import fs from "fs";
import ALL_QUOTES from "../../assets/all_quotes.json";

const QUOTE_FILE = "used_quotes.json";

const loadUsedQuotes = (): string[] => {
  if (fs.existsSync(QUOTE_FILE)) {
    return JSON.parse(fs.readFileSync(QUOTE_FILE, "utf8"));
  }
  return [];
};

const saveUsedQuotes = (usedQuotes: string[]) => {
  fs.writeFileSync(QUOTE_FILE, JSON.stringify(usedQuotes));
};

const getRandomQuote = (): string => {
  const usedQuotes = loadUsedQuotes();
  let availableQuotes = ALL_QUOTES.filter((q) => !usedQuotes.includes(q));

  if (availableQuotes.length === 0) {
    usedQuotes.length = 0;
    availableQuotes = [...ALL_QUOTES];
  }

  const quote =
    availableQuotes[Math.floor(Math.random() * availableQuotes.length)];

  usedQuotes.push(quote);

  saveUsedQuotes(usedQuotes);

  return quote;
};

export default getRandomQuote;
