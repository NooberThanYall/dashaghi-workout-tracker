import AuthService from "../services/authService.js";

export async function start(msg) {
  const tgId = msg.from.id;
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;

  const as = new AuthService(bot, chatId);
  await as.signUpUser(tgId, firstName);
}