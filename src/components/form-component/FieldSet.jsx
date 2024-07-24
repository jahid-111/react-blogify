/* eslint-disable react/prop-types */

const FieldSet = ({ label, children }) => {
  return (
    <fieldset>
      {label && (
        <legend className="text-2xl text-center font-bold mb-6">{label}</legend>
      )}
      <div>{children}</div>
    </fieldset>
  );
};

export default FieldSet;
