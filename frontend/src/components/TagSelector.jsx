import React, { useState } from "react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { getAllTags } from "../services/index/tags";

export const TagSelector = ({ selectTagHandler, defaultTags = [] }) => {
  const {
    data: allTags,
    isLoading: isTagLoading,
    isError: isTagError,
  } = useQuery({
    queryFn: () => getAllTags(),
    queryKey: ["tags"],
    onSuccess: (data) => {
      // console.log(data)
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    !isTagError &&
    !isTagLoading && (
      <Select
        defaultValue={defaultTags}
        isMulti
        name="tags"
        options={allTags.formattedTags}
        placeholder="Select Tags..."
        closeMenuOnSelect={false}
        onChange={selectTagHandler}
      />
    )
  );
};
