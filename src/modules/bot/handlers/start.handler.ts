import { Context } from 'grammy';

export function startHandler(ctx: Context) {
  return ctx.reply("👋 Welcome aboard! We’ve got everything you need — other bots can rest now 💤");
}

