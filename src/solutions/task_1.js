/**
 * Filters, sorts, and formats the data received from the SpaceX API based on the provided filter parameters.
 * @param {object} filterParams - An object containing the filter parameters to use when processing the data.
 * @param {number} filterParams.year - The year to filter by.
 * @param {string} filterParams.customerName - The customer name to filter by.
 * @returns {function} A function that takes an array of mission data and returns an array of objects representing each mission that matches the filter parameters.
 */
export const prepareData = (filterParams) => {
  const { year, customerName } = filterParams;
  return (missions) => {
    // Filter the data based on the provided filter parameters.
    const filteredMissions = missions.filter(
      (mission) =>
        Number(mission.launch_year) === year &&
        mission.rocket.second_stage.payloads.some((payload) =>
          payload.customers.includes(customerName)
        )
    );

    // Sort the filtered missions by the number of payloads for the specified customer and then by launch date.
    filteredMissions.sort((a, b) => {
      const aPayloads = a.rocket.second_stage.payloads.filter((payload) =>
        payload.customers.includes(customerName)
      );
      const bPayloads = b.rocket.second_stage.payloads.filter((payload) =>
        payload.customers.includes(customerName)
      );

      if (aPayloads.length !== bPayloads.length) {
        return bPayloads.length - aPayloads.length;
      }

      return new Date(b.launch_date_utc) - new Date(a.launch_date_utc);
    });

    // Format the filtered data into an array of objects representing each mission.
    const modifiedResult = filteredMissions.reduce((acc, mission) => {
      const payloads = mission.rocket.second_stage.payloads.filter((payload) =>
        payload.customers.includes(customerName)
      );

      const payloadsCount = payloads.length;

      acc.push({
        flight_number: mission.flight_number,
        mission_name: mission.mission_name,
        payloads_count: payloadsCount,
      });

      return acc;
    }, []);

    // Return the formatted data.
    return modifiedResult;
  };
};
