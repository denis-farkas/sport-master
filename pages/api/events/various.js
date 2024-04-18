import { apiHandler, eventsRepo } from "helpers/api";

export default apiHandler({
  get: getVarious,
});

async function getVarious(req, res) {
  const events = await eventsRepo.getVarious();
  return res.status(200).json(events);
}