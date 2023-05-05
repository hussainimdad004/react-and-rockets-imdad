// Import React and the custom hook useMissionList
import React from "react";
import { useMissionList } from "./useMissionList";

// Define the RocketsList component and pass filterParams as a prop
export const RocketsList = ({ filterParams }) => {
  // Call the custom hook useMissionList and destructure the missions and isLoading values
  const { missions, isLoading } = useMissionList(filterParams);

  // If the data is loading, show a loading message
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // If there are no missions to display, show a message indicating so
  if (!missions.length) {
    return <p>No data</p>;
  }

  // Render a list of missions if they exist
  return (
    <ul>
      {missions.map((mission) => (
        <li key={mission.flight_number}>
          {`#${mission.flight_number} ${mission.mission_name} (${mission.payloads_count})`}
        </li>
      ))}
    </ul>
  );
};
