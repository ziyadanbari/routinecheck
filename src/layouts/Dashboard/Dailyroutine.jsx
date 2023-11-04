/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import AddDR from "../../components/dashboard/AddDR";
import { instance } from "../../config/axios/Axios";
import { APIconfig } from "../../config/api/API";
import { DRContext } from "../../context/DRContext";
import DRCard from "../../components/dashboard/DRCard";
export default function Dailyroutine() {
  const [showAddDR, setShowAddDR] = React.useState(false);
  const { routines, setRoutines } = React.useContext(DRContext);
  React.useEffect(() => {
    const getAllDR = async () => {
      try {
        const response = await instance.get(APIconfig.getDR);
        setRoutines(response.data.routine);
      } catch (error) {
        if (error) throw error;
      }
    };
    getAllDR();
  }, []);
  return (
    <>
      {showAddDR && (
        <AddDR
          cancelClickHandler={() => {
            setShowAddDR(false);
          }}
        />
      )}
      <div className="text-white md:mx-20 mx-5">
        <div className="space-y-6">
          <div
            onClick={() => setShowAddDR(true)}
            className="flex justify-start">
            <div className="bg-gray-600 w-6 h-6 p-4 rounded-full flex justify-center items-center hover:bg-gray-700 cursor-pointer">
              <i className="fa-sharp fa-plus fa-2xl -mt-1" />
            </div>
          </div>
          <div className="">
            <div className="">
              {routines.length >= 1 ? (
                routines.map((e, i) => (
                  <DRCard
                    key={i}
                    title={e.title}
                    description={e.desc !== "" ? e.desc : "No description"}
                    time={e.time}
                    deleteHandler={setRoutines}
                    completed={e.completed}
                    passed={e.passed}
                    completeHandler={setRoutines}
                  />
                ))
              ) : (
                <div className="text-2xl font-semibold mt-4">
                  No Routine Found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
