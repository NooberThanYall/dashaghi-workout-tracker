import RecordService from "../services/recordService.js";

export async function addRecord(msg, match) {
  const tgId = msg.from.id;
  const chatId = msg.chat.id;
  const lowerMatch = match[1].toLowerCase();
  const [exercise, reps, weight] = lowerMatch.split(" ");

  const recordService = new RecordService(tgId, chatId);
  await recordService.newRecord(exercise, reps, weight);
}

export async function progress(msg, match) {
  const tgId = msg.from.id;
  const chatId = msg.chat.id;
  const exercise = match[1].toLowerCase();

  const recordService = new RecordService();
}
