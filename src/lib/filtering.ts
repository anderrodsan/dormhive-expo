//Filter the data based on the status
export function filterEventsByStatus(data: any, status: string, statuses: any) {
  //I get an array including event_id/user_id/status named statuses, filter the data based on the status

  if (status === "all") {
    return data;
  } else if (status === "going") {
    return statuses
      .filter((status: any) => status.status === "going")
      .map((status: any) => status.event_id);
  } else if (status === "interested") {
    return statuses
      .filter((status: any) => status.status === "interested")
      .map((status: any) => status.event_id);
  }
}
