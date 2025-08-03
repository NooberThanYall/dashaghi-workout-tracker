import { User } from "../models/User.js";

class AuthService {
  #bot;
  #chatId;

  constructor(bot, chatId) {
    this.#bot = bot;
    this.#chatId = chatId;
  }

  async checkAuthentication(tgId) {
    const user = await User.findOne({ tgId });

    console.log(user)

    if (!user) {
      this.#bot.sendMessage(
        this.#chatId,
        "Nigga You Gotta SignIn with /start",
        {
          reply_markup: {
            keyboard: [["/start"]],
          },
        }
      );
      return;
    }

    return user;
  }

  async signUpUser(tgId, firstName) {
    const userAlrExists = await User.findOne({ tgId });

    if (userAlrExists) {
      await this.#bot.sendMessage(
        this.#chatId,
        "Nigga Youre Already Registered Stop \nGo on with the commands\n\n/addrecord [exercise] [reps] [weight]\n/process ?[exercise]"
      );
      return null; // Return null to indicate user already exists
    }

    const newUser = await User.create({ tgId, firstName });
    await this.#bot.sendMessage(
      this.#chatId,
      "You are now registered as my nigger, Welcome!"
    );

    return newUser;
  }
}

export default AuthService;
