import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "components/Container";
import PollForm from "./Form/PollForm";
import pollsApi from "apis/polls";
import Toastr from "components/Common/Toastr";
import PageLoader from "components/PageLoader";

const EditTask = ({ history }) => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [pollTitle, setPollTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      await pollsApi.update({
        id,
        payload: { poll: { title, options_attributes: options } },
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(id);
      setTitle(response.data.poll.title);
      setPollTitle(response.data.poll.title);
      setOptions(response.data.poll.options);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPollDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex justify-center">
        <div className="w-3/4 px-4">
          <h2 className="text-3xl font-extrabold text-center text-indigo-500">
            {pollTitle}
          </h2>
          <PollForm
            title={title}
            setTitle={setTitle}
            options={options}
            setOptions={setOptions}
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </Container>
  );
};

export default EditTask;
