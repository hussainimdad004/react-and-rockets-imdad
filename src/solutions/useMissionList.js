import { useState, useEffect } from "react";
import { prepareData } from "../solutions/task_1";

export const useMissionList = (filterParams) => {
  const [missions, setMissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch missions from the SpaceX API on mount
    async function fetchMissions() {
      setIsLoading(true);
      const response = await fetch(
        "https://api.spacexdata.com/v3/launches/past"
      );
      const data = await response.json();
      // Prepare and filter data based on filterParams and set state
      setMissions(prepareData(filterParams)(data));
      setIsLoading(false);
    }

    fetchMissions();
  }, []); // only run once on mount

  useEffect(() => {
    // Filter missions based on updated filterParams and set state
    const filteredMissions = prepareData(filterParams)(missions);
    setMissions(filteredMissions);
  }, [filterParams]); // re-run when filterParams changes

  // Return the list of missions and loading status
  return { missions, isLoading };
};
