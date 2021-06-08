// Packages
import { ReactElement, useMemo } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";

// Stylesheet
import { useInputCardStyle } from "../Input/styles";

// Types
import { UserType } from "../../constants/types";

interface DropdownProps {
  options?: [];
  styles?: any;
  handleChangeDropdown: (e: any) => void;
  placeholder: string;
  value?: any;
  withAll?: any;
}

export default function Dropdown({
  options,
  styles,
  handleChangeDropdown,
  placeholder,
  value,
  withAll,
}: DropdownProps): ReactElement {
  const classes = useInputCardStyle();
  const users = useSelector((state: any) => state.users.users);
  const names = users
    ? useMemo(
        () =>
          users.map((item: UserType, index: number) => {
            const { name } = item;
            const { first: firstName, last: lastName } = name;
            return {
              label: firstName + " " + lastName,
              value: firstName + " " + lastName,
            };
          }),
        [users]
      )
    : [];
  if (withAll && names.length > 0) {
    if (names[0].value !== "All") names.unshift({ label: "All", value: "All" });
  }
  return (
    <Select
      styles={styles}
      onChange={handleChangeDropdown}
      placeholder={placeholder}
      options={options || names}
      className={classes.formControl}
      value={value}
      defaultValue={names[0]}
    />
  );
}
