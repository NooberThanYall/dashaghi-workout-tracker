import { Record } from "./../models/Record.js";
import AuthService from "./authService.js";

class RecordService {
  #tgId;
  #chatId;
  #bot;

  constructor(tgId, chatId, bot) {
    this.#tgId = tgId;
    this.#chatId = chatId;
    this.#bot = bot;
  }

  async newRecord(exercise, reps, weight) {
    if (!exercise || !reps || !weight) {
      this.#bot.sendMessage(
        this.#chatId,
        "Ain't Yu Got no Brain Homie? Stop bein an idiot (e.g., /addRecord bench 10 100)"
      );
      return;
    }

    const as = new AuthService(this.#bot, this.#chatId);
    const user = await as.checkAuthentication(this.#tgId);
    // console.log("User after checkAuthentication:", user); // Debug log

    if (!user) {
      // console.log("No user found, exiting newRecord"); // Debug log
      return;
    }

    // console.log("User found, proceeding with record creation:", user); // Debug log
    await Record.create({
      userId: user._id,
      exercise,
      reps,
      weight,
    });

    const prevRecords = await Record.find({ userId: user._id, exercise })
      .sort({ createdAt: -1 })
      .limit(3);

    this.#bot.sendMessage(
      this.#chatId,
      `Record was Succesfully Added. \n\nYour 3 Previous Records on This Excercise:\n     ${prevRecords
        .map((r) => {
          return `${r.reps} x ${r.weight}kg at  ${r.createdAt.toLocaleString(
            "fa-IR"
          )}`;
        })
        .join("\n")}`
    );
  }

  async progress(exercise = null) {
    const as = new AuthService();
    const user = as.checkAuthentication(this.#tgId);

    if (!user) return;

    const recordsQuery = { userId: user._id };

    if (exercise) recordsQuery.exercise = exercise;

    const records = await Record.find(recordsQuery);

    let volume;

    const growth = records.map((r) => {
      volume += r.weight * r.reps;
    });
  }
}

export default RecordService;
