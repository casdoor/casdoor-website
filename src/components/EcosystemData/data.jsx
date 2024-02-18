import Integrations from "/static/data/ecosystem/Providers.json";
import Providers from "/static/data/ecosystem/Integrations.json";
import SDKs from "/static/data/ecosystem/SDKs.json";

const data = [
  ...Integrations,
  ...Providers,
  ...SDKs,
];

function sortList() {
  let result = data;
  // Sort by site name
  result = sortBy(result, (item) => item.title.toLowerCase());
  // Sort by favorite tag, favorites first
  result = sortBy(result, (item) => !item.tags.includes("favorite"));
  return result;
}

export const sortedList = sortList();

export function sortBy(array, getter) {
  const sortedArray = [...array];
  sortedArray.sort((a, b) =>
  // eslint-disable-next-line no-nested-ternary
    getter(a) > getter(b) ? 1 : getter(b) > getter(a) ? -1 : 0
  );
  return sortedArray;
}
