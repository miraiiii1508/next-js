import {
  InputAttributes,
  NumericFormat,
  NumericFormatProps,
} from "react-number-format";

const InputReactFormat = (props: NumericFormatProps<InputAttributes>) => {
  return (
    <NumericFormat
      className="flex outline-none h-10 rounded-md font-medium px-3 w-full text-sm border border-gray-200 focus:!border-primary dark:border-opacity-10 bg-white dark:bg-grayDarker focusPrimary"
      
      {...props}
    />
  );
};

export default InputReactFormat;
