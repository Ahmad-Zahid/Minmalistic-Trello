// Packages
import { ReactElement, useMemo } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";

// Stylesheet
import { useInputCardStyle } from "../Input/styles";

// Types
import { ObjectType, UserType } from "../../constants/types";

interface DropdownProps {
  options?: any;
  styles?: any;
  handleChangeDropdown: (e: { value: string } ) => void;
  placeholder: string;
  value?: any;
  withAll?: boolean;
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
          users.map((item: UserType) => {
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
    if (names[0].value !== "All") names.unshift({ label: "All Users", value: "All" });
  }
  return (
    <Select
      styles={styles}
      onChange={handleChangeDropdown}
      placeholder={placeholder}
      options={options || names}
      className={classes.formControl}
      value={value}
      defaultValue={options?options[0]:names[0]}
    />
  );
}
