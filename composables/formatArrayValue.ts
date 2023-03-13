export const formatArrayValue = (value: any, delimiter = ",") => {
  if (!Array.isArray(value)) {
    return value;
  }
    return value.join(`${delimiter} `);
  }