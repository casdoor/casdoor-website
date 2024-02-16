/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

export default function Svg(props) {
  const {
    svgClass,
    colorAttr,
    children,
    color = "inherit",
    size = "medium",
    viewBox = "0 0 24 24",
    ...rest
  } = props;

  return (
    <svg
      viewBox={viewBox}
      color={colorAttr}
      aria-hidden
      className={clsx(styles.svgIcon, styles[color], styles[size], svgClass)}
      {...rest}>
      {children}
    </svg>
  );
}
