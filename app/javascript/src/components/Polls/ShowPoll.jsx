import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "components/Button";

import Container from "components/Container";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";
import Toastr from "components/Common/Toastr";

const ShowPoll = () => {
  const { id } = useParams();
  const [pollDetails, setPollDetails] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setshowResult] = useState(false);

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(id);
      setPollDetails(response.data.poll);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (selectedOption == "") {
      Toastr.error("Answer can't be blank.");
      return;
    }
    setPollDetails(state => {
      state.options.map(obj => {
        if (obj.id == selectedOption) obj.vote_count = ++obj["vote_count"];
      });
      return state;
    });

    await pollsApi.update({
      id,
      payload: {
        poll: {
          title: pollDetails.title,
          options_attributes: pollDetails.options,
        },
      },
    });
    setshowResult(true);
  };

  const optionVotePercentage = id => {
    let percentage;
    const total_vote = pollDetails.options.reduce(
      (sum, current) => sum + current.vote_count,
      0
    );
    pollDetails.options.map(obj => {
      if (obj.id == id) {
        percentage = (obj.vote_count / total_vote) * 100;
      }
    });
    return percentage.toFixed(2);
  };

  useEffect(() => {
    fetchPollDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex justify-center w-full">
        <div className="w-3/4 py-4">
          <h2 className="text-2xl font-semibold text-indigo-500">
            {pollDetails?.title}
          </h2>
          {pollDetails.options.map(option => (
            <div
              className="w-3/4 py-2 cursor-pointer"
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
            >
              <div className="flex items-center">
                <div className="border rounded-full px-2 py-3 w-3/4">
                  <div
                    className={`text-base text-gray-800 ${
                      selectedOption == option.id && "text-indigo-500"
                    }`}
                  >
                    {option.value}
                  </div>
                </div>
                {showResult ? (
                  <div className="px-2 w-1/4">
                    <div className="text-base text-indigo-500">
                      {optionVotePercentage(option.id)}%
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
          {showResult ? (
            <div>
              <p className="text-center text-base text-indigo-500">
                Thanks for voting!
              </p>
              <p className="text-center text-base">🎉</p>
            </div>
          ) : (
            <div className="flex justify-center px-6">
              <Button
                loading={false}
                buttonText="Submit"
                onClick={handleSubmit}
              />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ShowPoll;
