const toggleStateKey = "boolcheckToggleStatus";
const toggleDefaultValue = true;

export const setToggleState = (state: boolean): boolean => {
  localStorage.setItem(toggleStateKey, JSON.stringify(state));
  return state;
};

export const getToggleState = (): boolean => {
  const value = localStorage.getItem(toggleStateKey);
  if (value == null) {
    return toggleDefaultValue;
  }
  let parsed = toggleDefaultValue;
  try {
    const tmp = JSON.parse(value);
    if (typeof tmp === "boolean") {
      parsed = tmp;
    }
  } catch {
    // noop
  }
  return parsed;
};
