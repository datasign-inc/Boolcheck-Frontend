import { useTranslation } from "react-i18next";
import { styled, Tab, Tabs } from "@mui/material";
import { useState } from "react";

import { UrlSortKey } from "../../api/types.ts";
import { getStartDateTime } from "../../util/time.ts";

export interface SortTabProps {
  onChangeTabHandler: (sortKey: UrlSortKey, startDate?: string) => void;
}

const tabIndexToSortKey = (index: number): UrlSortKey => {
  switch (index) {
    case 0:
      return "-created_at";
    case 1:
      return "-true_count";
    case 2:
      return "-false_count";
    default:
      return "-created_at";
  }
};

const StyledTab = styled((props) => <Tab {...props} />)(() => ({
  "&.MuiTab-root": {
    fontSize: 11,
    color: "#000000", //todo: dark mode light mode の際にthemeを参照して決定する必要がある?
  },
  "&.Mui-selected": {
    fontSize: 11,
    color: "#000000", //todo: dark mode light mode の際にthemeを参照して決定する必要がある?
  },
})) as typeof Tab;

export const SortTab = (props: SortTabProps) => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const tabLabels = [t("TabLabel1"), t("TabLabel2"), t("TabLabel3")];

  const howManyDaysBack = 7;

  return (
    <Tabs
      sx={{ mt: 2 }}
      value={index}
      onChange={(_: unknown, newValue: number) => {
        setIndex(newValue);
        const startDate =
          newValue > 0 && newValue < 3
            ? getStartDateTime(howManyDaysBack)
            : undefined;
        props.onChangeTabHandler(tabIndexToSortKey(newValue), startDate);
      }}
      variant="fullWidth"
      TabIndicatorProps={{ style: { background: "#000000" } }}
      centered
    >
      {tabLabels.map((label: string) => {
        return <StyledTab key={label} label={label} />;
      })}
    </Tabs>
  );
};
