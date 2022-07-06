import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import * as puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  async getTables() {
    const tables = ["english", "java", "python", "software design"];
    return tables;
  }
  async getEmbedPageContent(address: string): Promise<string> {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(address, { waitUntil: 'domcontentloaded' });
      const htmlContent = await page.content();
      // Take screenshot
      await browser.close();
      return htmlContent;
    }
    catch (err) {
      return "Your request url taking too long to response. Please try again later.";
    }
  }
}