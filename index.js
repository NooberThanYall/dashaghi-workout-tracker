"use strict";
import TelegramBot from "node-telegram-bot-api";
import { connectToDatabase } from "./src/lib/db.js";
import { addRecord, progress } from "./src/functions/recordController.js";
import { configDotenv } from "dotenv";
import { start } from "./src/functions/userController.js";
import RecordService from "./src/services/recordService.js";
import AuthService from "./src/services/authService.js";

configDotenv();

const token = process.env.TOKEN;

await connectToDatabase();

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const tgId = msg.from.id;
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;

  const as = new AuthService(bot, chatId);
  await as.signUpUser(tgId, firstName);
});

bot.onText(/\/addrecord (.+)/, async (msg, match) => {
  const tgId = msg.from.id;
  const chatId = msg.chat.id;
  const lowerMatch = match[1].toLowerCase();
  const [exercise, reps, weight] = lowerMatch.split(" ");

  const recordService = new RecordService(tgId, chatId, bot);
  await recordService.newRecord(exercise, reps, weight);
});

bot.onText(/\/progress (.+)/, async (msg, match) => {
  const tgId = msg.from.id;
  const chatId = msg.chat.id;
  const exercise = match[1].toLowerCase();

  const recordService = new RecordService(tgId, chatId, exercise);

  
});
