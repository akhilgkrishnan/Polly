import React from "react";

import Input from "components/Input";
import Button from "components/Button";

const PollForm = ({
  title,
  setTitle,
  options,
  setOptions,
  loading,
  handleSubmit,
}) => {
  const handleSetOptions = (event, index) => {
    event.preventDefault();
    const data = [...options];
    data[index].value = event.target.value;
    setOptions(data);
  };
  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <Input
        label="Title"
        placeholder="Write a question"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      {options.map((option, index) => (
        <div className="w-3/4" key={index + 1}>
          <Input
            label={"Option " + (index + 1)}
            placeholder={"Option " + (index + 1)}
            value={option.value}
            onChange={e => handleSetOptions(e, index)}
          />
        </div>
      ))}
      <div className="flex justify-center">
        <Button type="submit" buttonText={"Submit"} loading={loading} />
      </div>
    </form>
  );
};

export default PollForm;
