// Please implement your solution in this file

export const prepareData = ({ year, customerName }) => {
  return (missions) => {
    const filteredMissions = missions.filter(
      (mission) =>
        Number(mission.launch_year) === year &&
        mission.rocket.second_stage.payloads.some((payload) =>
          payload.customers.includes(customerName)
        )
    );

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

    const modifiledResult = filteredMissions.reduce((acc, mission) => {
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
    return modifiledResult;
  };
};
