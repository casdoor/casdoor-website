import {usePluralForm} from "@docusaurus/theme-common";
import {translate} from "@docusaurus/Translate";

export function useSiteCountPlural() {
  const {selectMessage} = usePluralForm();
  return (sitesCount) =>
    selectMessage(
      sitesCount,
      translate(
        {
          id: "showcase.filters.resultCount",
          description:
            "Pluralized label for the number of sites found on the showcase. Use as much plural forms (separated by \"|\") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)",
          message: "1 plugin|{sitesCount} plugins",
        },
        {sitesCount}
      )
    );
}
