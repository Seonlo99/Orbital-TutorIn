import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import MainLayout from "../../components/MainLayout";
import ViewPdf from "../../components/Admin/ViewPdf";
import {
  getApplications,
  editApplication,
} from "../../services/index/applications";

const AdminPage = () => {
  const userState = useSelector((state) => state.user);
  const [moduleName, setModuleName] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showPdf, setShowPdf] = useState({});

  useEffect(() => {
    if (!userState.userInfo || !userState.userInfo.isAdmin) {
      navigate("/");
    }
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["application"],
    queryFn: () =>
      getApplications({
        token: userState.userInfo.token,
      }),
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const openHandler = (applicationId) => {
    setShowPdf((cur) => {
      return { ...cur, [applicationId]: true };
    });
  };

  const closeHandler = (applicationId) => {
    setShowPdf((cur) => {
      return { ...cur, [applicationId]: false };
    });
  };

  // console.log(data)
  const { mutate, isLoading: isMutateLoading } = useMutation({
    mutationFn: ({ applicationId, accept, moduleName }) => {
      return editApplication({
        token: userState.userInfo.token,
        applicationId,
        accept,
        moduleName,
      });
    },
    onSuccess: (data) => {
      // toast.success("Action sent!")
      queryClient.invalidateQueries({ queryKey: ["application"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleMutate = ({ applicationId, accept, moduleName }) => {
    mutate({ applicationId, accept, moduleName });
  };
  return (
    !isLoading &&
    !isError && (
      <MainLayout>
        {userState.userInfo.isAdmin && (
          <div className="flex flex-col items-center mt-10">
            <div className="text-2xl font-bold">Admin Dashboard</div>
            <div className="mt-10 divide-y divide-slate-300 w-full max-w-4xl">
              <div className="flex flex-row bg-gray-200 px-5 py-2 gap-x-2 rounded-t-lg w-full">
                <div className="w-[30%]">Name</div>
                <div className="w-[20%]">View</div>
                <div className="w-[50%]">Action</div>
              </div>

              {data.applications.map((application) => {
                return (
                  <div key={application._id}>
                    <div className="flex flex-row px-5 py-2 gap-x-2 w-full">
                      <div className="w-[30%]">
                        {application.tutorId.username}
                      </div>
                      <div className="w-[20%]">
                        <button
                          onClick={() => openHandler(application._id)}
                          className="border border-black rounded-lg px-1 lg:px-4 py-2 hover:bg-gray-400 hover:text-white"
                        >
                          View Pdf
                        </button>
                      </div>
                      <div className="w-[50%] flex flex-col gap-y-2">
                        Proposed module: {application.requestModule}
                        <div className="flex flex-row justify-around">
                          <input
                            type="text"
                            placeholder="Approval Module"
                            className="border rounded-lg p-2"
                            value={moduleName}
                            onChange={(e) => setModuleName(e.target.value)}
                          />
                          <button
                            onClick={() =>
                              setModuleName(application.requestModule)
                            }
                            className="border rounded-lg p-2 hover:bg-gray-200"
                          >
                            Use Proposed
                          </button>
                        </div>
                        <div className="flex flex-row gap-x-10 justify-center">
                          <button
                            onClick={() => {
                              handleMutate({
                                applicationId: application._id,
                                accept: true,
                                moduleName: moduleName,
                              });
                            }}
                            className="border border-green-600 rounded-lg px-1 lg:px-4 py-2 hover:bg-green-600 hover:text-white"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => {
                              handleMutate({
                                applicationId: application._id,
                                accept: false,
                              });
                            }}
                            className="border border-red-600 rounded-lg px-1 lg:px-4 py-2 hover:bg-red-600 hover:text-white"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                    {showPdf[application._id] && (
                      <ViewPdf
                        closeHandler={() => closeHandler(application._id)}
                        PDFLINK={application.pdfUrl}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </MainLayout>
    )
  );
};

export default AdminPage;
