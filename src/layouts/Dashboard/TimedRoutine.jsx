/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { TRContext } from "../../context/TRContext";
import { instance } from "../../config/axios/Axios";
import { APIconfig } from "../../config/api/API";
import AddTR from "../../components/dashboard/AddTR";
import TRCard from "../../components/dashboard/TRCard";

export default function TimedRoutine() {
  const [showAddTR, setShowAddTR] = useState(false);
  const { routines, setRoutines } = useContext(TRContext);
  useEffect(() => {
    const getAllTR = async () => {
      const response = await instance.get(APIconfig.getTR);
      setRoutines(response.data.routine);
    };
    getAllTR();
  }, []);
  return (
    <>
      {showAddTR && (
        <AddTR
          cancelClickHandler={() => {
            setShowAddTR(false);
          }}
        />
      )}
      <div className="text-white md:mx-20 mx-5">
        <div className="space-y-6">
          <div
            onClick={() => setShowAddTR(true)}
            className="flex justify-start">
            <div className="bg-gray-600 w-6 h-6 p-4 rounded-full flex justify-center items-center hover:bg-gray-700 cursor-pointer">
              <i className="fa-sharp fa-plus fa-2xl -mt-1" />
            </div>
          </div>
        </div>
        <div>
          <div>
            {routines.length >= 1 ? (
              routines.map((e, i) => {
                return (
                  <TRCard
                    key={i}
                    title={e.title}
                    description={e.desc}
                    time={e.time}
                    deleteHandler={setRoutines}
                    complete={e.completed}
                    passed={e.passed}
                    completeHandler={setRoutines}
                    id={e._id}
                  />
                );
              })
            ) : (
              <div className="text-2xl font-semibold mt-4">
                No Routine Found
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
