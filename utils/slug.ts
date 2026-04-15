const DIACRITIC_MARKS = /[\u0300-\u036f]/g;
const TOKEN_PATTERN = /[A-Za-z0-9]+/g;

type SlugOptions = {
  compactAcronyms?: boolean;
  lower?: boolean;
};

function getTokens(value: unknown) {
  return (
    String(value || "")
      .normalize("NFKD")
      .replace(DIACRITIC_MARKS, "")
      .match(TOKEN_PATTERN) || []
  );
}

function isCompactAcronym(tokens: string[]) {
  return (
    tokens.length > 1 &&
    tokens.every((token) => /^[A-Z0-9]{1,4}$/.test(token))
  );
}

export function createSlug(value: unknown, options: SlugOptions = {}) {
  const { compactAcronyms = false, lower = false } = options;
  const tokens = getTokens(value);

  if (tokens.length === 0) {
    return "";
  }

  const separator = compactAcronyms && isCompactAcronym(tokens) ? "" : "-";
  const slug = tokens.join(separator);

  return lower ? slug.toLowerCase() : slug;
}

export function createClubSlug(value: unknown) {
  return createSlug(value, { compactAcronyms: true });
}

export function createAlbumSlug(value: unknown) {
  return createSlug(value);
}
