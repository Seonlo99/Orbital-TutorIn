import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getAllPosts } from "../services/index/posts";
import MainLayout from "../components/MainLayout";
import { SearchBar } from "../components/Filters/SearchBar";
import { TagSelector } from "../components/TagSelector";
import { Sort } from "../components/Filters/Sort";

import DisplayPost from "../components/Forum/DisplayPost";

const DiscussPage = () => {
  const POSTLIMIT = 10;
  let [curPage, setCurPage] = useState(0);
  let [num, setNum] = useState(0);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  // const [availableTags, setAvailableTags] = useState([]) // array of tags from db

  // const queryClient = useQueryClient();
  // console.log(search)

  const pages = [{ page: num }, { page: num + 1 }, { page: num + 2 }];

  function nextPage(totalPosts) {
    setNum((curState) => {
      return curState + 3 >= totalPosts / POSTLIMIT ? curState : curState + 1;
    });
  }
  function prevPage() {
    setNum((curState) => {
      return curState > 0 ? curState - 1 : 0;
    });
  }

  function mobilePrevPage() {
    setCurPage((curState) => {
      return curState > 0 ? curState - 1 : 0;
    });
    setNum((curState) => {
      return curPage;
    });
  }
  function mobileNextPage(totalPosts) {
    setCurPage((curState) => {
      return curState + 1 < Math.ceil(totalPosts / POSTLIMIT)
        ? curState + 1
        : curState;
    });
    setNum((curState) => {
      return curState;
    });
  }

  const {
    data: postsData,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getAllPosts(curPage + 1, search, sortBy, selectedTags),
    queryKey: ["posts", curPage, search, sortBy, selectedTags],
    onError: (error) => {
      console.log(error);
    },
  });

  // console.log(postsData);
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const newPostHandler = () => {
    if (!userState.userInfo) {
      toast.error("Login to create new post!");
    } else {
      navigate("/createPost");
    }
  };

  const setSortByHandler = (text) => {
    setSortBy(text);
    // queryClient.invalidateQueries({queryKey:["posts"]})
  };

  // const {data: allTags, isLoading:isTagLoading, isError:isTagError} = useQuery({
  //     queryFn: () => getAllTags(),
  //     queryKey: ["tags"],
  //     onSuccess:(data)=>{
  //         // console.log(data.formattedTags)
  //         // setAvailableTags(data.formattedTags.map((tag)=> {return tag.value}))
  //     },
  //     onError: (error) =>{
  //         console.log(error);
  //     }
  // })

  // console.log(availableTags)

  const selectTagHandler = (selectedTags) => {
    setSelectedTags(selectedTags);
  };

  return (
    <MainLayout>
      <div className="container mx-auto max-w-4xl mt-5">
        <section className="flex flex-row rounded-md bg-slate-300 py-4 items-center gap-x-3 px-5 justify-between shadow-md">
          <div className="flex flex-row items-center gap-x-4">
            <button
              className="rounded-full p-3 hover:bg-slate-200"
              onClick={newPostHandler}
            >
              New
            </button>
            <div>
              <Sort
                sortBy={sortBy}
                setSortByHandler={(text) => {
                  setSortByHandler(text);
                }}
              />
            </div>
            <div>
              <TagSelector
                selectTagHandler={(selectedTags) =>
                  selectTagHandler(selectedTags)
                }
              />
            </div>
            {/* <div>
                    Filter 3
                </div> */}
          </div>
          <div>
            <SearchBar setSearch={(text) => setSearch(text)} />
          </div>
        </section>
        <section className="divide-y divide-slate-300">
          {!isLoading &&
            !isError &&
            postsData.posts.map((post) => (
              <DisplayPost key={post._id}post={post} />
            ))}
        </section>

        <section>
          {!isLoading && !isError && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={mobilePrevPage}
                  disabled={curPage === 0}
                  className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50
                         ${
                           curPage === 0 &&
                           "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                         }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => mobileNextPage(postsData.totalCount)}
                  disabled={
                    curPage + 1 === Math.ceil(postsData.totalCount / POSTLIMIT)
                  }
                  className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        ${
                          curPage + 1 ===
                            Math.ceil(postsData.totalCount / POSTLIMIT) &&
                          "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                        }`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing
                    <span className="font-medium px-1">
                      {postsData.totalCount ? curPage * POSTLIMIT + 1 : 0}
                    </span>
                    to
                    <span className="font-medium px-1">
                      {(curPage + 1) * POSTLIMIT > postsData.totalCount
                        ? postsData.totalCount
                        : (curPage + 1) * POSTLIMIT}
                    </span>
                    of
                    <span className="font-medium px-1">
                      {postsData.totalCount}
                    </span>
                    results
                  </p>
                </div>
                <div>
                  <div
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={prevPage}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {pages.map((page, i) => {
                      return (
                        page.page <
                          Math.ceil(postsData.totalCount / POSTLIMIT) && (
                          <button
                            key={i}
                            onClick={() => setCurPage((curState) => page.page)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                              page.page === curPage &&
                              "bg-indigo-500 text-white z-10 hover:bg-indigo-500"
                            }`}
                          >
                            {page.page + 1}
                          </button>
                        )
                      );
                    })}

                    <button
                      onClick={() => nextPage(postsData.totalCount)}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </MainLayout>
  );
};

export default DiscussPage;
