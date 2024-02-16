import {useFilteredList} from "@site/src/pages/ecosystem/_hooks/useFilteredList";
import {useSiteCountPlural} from "@site/src/pages/ecosystem/_hooks/useSiteCountPlural";
import clsx from "clsx";
import styles from "@site/src/pages/ecosystem/styles.module.css";
import Heading from "@theme/Heading";
import Translate from "@docusaurus/Translate";
import ShowcaseFilterToggle from "@site/src/pages/ecosystem/_components/ShowcaseFilterToggle";
import ShowcaseTooltip from "@site/src/pages/ecosystem/_components/ShowcaseTooltip";
import ShowcaseTagSelect from "@site/src/pages/ecosystem/_components/ShowcaseTagSelect";
import FavoriteIcon from "@site/src/components/svgIcons/FavoriteIcon";
import React from "react";
import {TagList, Tags} from "@site/src/tableData/tags";

export default function ShowcaseFilters() {
  const filteredUsers = useFilteredList();
  const siteCountPlural = useSiteCountPlural();

  const languageList = TagList.slice(0, 11);
  const pluginList = TagList.slice(11);

  return (
    <section className="container margin-top--l margin-bottom--lg">
      <div className={clsx("margin-bottom--sm", styles.filterCheckbox)}>
        <div>
          <Heading as="h2">
            <Translate id="showcase.filters.title">Filters</Translate>
          </Heading>
          <span>{siteCountPlural(filteredUsers.length)}</span>
        </div>
        <ShowcaseFilterToggle />
      </div>
      <div>
        <ul className={clsx("clean-list", styles.checkboxList)}>
          {
            languageList.map((tag, i) => {
              return <Li key={i} tag={tag}></Li>;
            })}
        </ul>
      </div>
      <div>
        <ul className={clsx("clean-list", styles.checkboxList)}>
          {
            pluginList.map((tag, i) => {
              return <Li key={i} tag={tag}></Li>;
            })
          }
        </ul>
      </div>
    </section>
  );
}

function Li({
  tag,
}) {
  const {label, description, color} = Tags[tag];
  const id = `showcase_checkbox_id_${tag}`;

  return (
    <li className={styles.checkboxListItem}>
      <ShowcaseTooltip
        id={id}
        text={description}
        anchorEl="#__docusaurus"
      >
        <ShowcaseTagSelect
          tag={tag}
          id={id}
          label={label}
          icon={
            tag === "favorite" ? (
              <FavoriteIcon svgClass={styles.svgIconFavoriteXs} />
            ) : (
              <span
                style={{
                  backgroundColor: color,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  marginLeft: 8,
                }}
              />
            )
          }
        />
      </ShowcaseTooltip>
    </li>
  );
}
