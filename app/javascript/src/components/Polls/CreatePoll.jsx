import React, { useState } from "react";
import Container from "components/Container";
import PollForm from "components/Polls/Form/PollForm";
import pollsApi from "apis/polls";
const OPTIONS_COUNT = 4;

const CreatePoll = ({ history }) => {
  const [title, setTitle] = useState("");
  // Add four options to the options list
  const [options, setOptions] = useState(
    Array(OPTIONS_COUNT).fill({ value: "" }).flat()
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await pollsApi.create({ poll: { title, options_attributes: options } });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex justify-center">
        <div className="w-3/4 px-4">
          <h2 className="text-3xl font-extrabold text-center text-indigo-500">
            Create Poll
          </h2>
          <PollForm
            setTitle={setTitle}
            loading={loading}
            handleSubmit={handleSubmit}
            options={options}
            setOptions={setOptions}
          />
        </div>
      </div>
    </Container>
  );
};

export default CreatePoll;
