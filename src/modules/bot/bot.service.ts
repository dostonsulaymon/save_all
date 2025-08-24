import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Bot } from 'grammy';
import { ConfigService } from '@nestjs/config';
import { startHandler } from '#/modules/bot/handlers/start.handler';
import { helpHandler } from '#/modules/bot/handlers/help.handler';

@Injectable()
export class BotService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(BotService.name);
  private bot: Bot;

  constructor(private readonly configService: ConfigService) {
    const token = this.configService.get<string>('BOT_TOKEN');
    if (!token) {
      throw new Error('BOT_TOKEN is not defined in environment variables');
    }

    this.bot = new Bot(token);

    this.bot.command('start', startHandler);
    this.bot.command('help', helpHandler);
  }

  async onModuleInit() {
    await this.bot.start();
    this.logger.warn('🤖 Bot started');
  }

  async onModuleDestroy() {
    await this.bot.stop();
    this.logger.error('🛑 Bot stopped');
  }
}
