import {useFilteredList} from "@site/src/pages/ecosystem/_hooks/useFilteredList";
import Heading from "@theme/Heading";
import Translate from "@docusaurus/Translate";
import {sortedList} from "@site/src/tableData/tableData";
import styles from "@site/src/pages/ecosystem/styles.module.css";
import clsx from "clsx";
import FavoriteIcon from "@site/src/components/svgIcons/FavoriteIcon";
import ShowcaseCard from "@site/src/pages/ecosystem/_components/ShowcaseCard";
import React from "react";

const favoriteList = sortedList.filter((item) =>
  item.tags.includes("favorite")
);
const otherUsers = sortedList.filter((item) => !item.tags.includes("favorite"));

export default function ShowcaseCards() {
  const filteredList = useFilteredList();

  if (filteredList.length === 0) {
    return (
      <section className="margin-top--lg margin-bottom--xl">
        <div className="container padding-vert--md text--center">
          <Heading as="h2">
            <Translate id="showcase.usersList.noResult">No result</Translate>
          </Heading>
        </div>
      </section>
    );
  }

  return (
    <section className="margin-top--lg margin-bottom--xl">
      {filteredList.length === sortedList.length ? (
        <>
          <div className={styles.showcaseFavorite}>
            <div className="container">
              <div
                className={clsx(
                  "margin-bottom--md",
                  styles.showcaseFavoriteHeader
                )}
              >
                <Heading as="h2">
                  <Translate id="showcase.favoritesList.title">
                    Our favorites
                  </Translate>
                </Heading>
                <FavoriteIcon svgClass={styles.svgIconFavorite} />
              </div>
              <ul
                className={clsx("container", "clean-list", styles.showcaseList)}
              >
                {favoriteList.map((item, index) => {
                  return <ShowcaseCard key={item.title + index} item={item} />;
                })}
              </ul>
            </div>
          </div>
          <div className="container margin-top--lg">
            <Heading as="h2" className={styles.showcaseHeader}>
              <Translate id="showcase.usersList.allUsers">
                All plugins
              </Translate>
            </Heading>
            <ul className={clsx("clean-list", styles.showcaseList)}>
              {otherUsers.map((item, index) => (
                <ShowcaseCard key={item.title + index} item={item} />
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="container">
          <div
            className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}
          />
          <ul className={clsx("clean-list", styles.showcaseList)}>
            {filteredList.map((item, index) => (
              <ShowcaseCard key={item.title + index} item={item} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
