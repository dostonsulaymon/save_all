import { Context } from 'grammy';

export function helpHandler(ctx: Context) {
  return ctx.reply('ℹ️ Available commands: /start, /help, /ping');
}
