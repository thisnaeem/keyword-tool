import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Helper function to extract numbers from string
const extractNumber = (text: string): number => {
  const matches = text.match(/[\d,]+/);
  if (!matches) return 0;
  return parseInt(matches[0].replace(/,/g, ''));
};

async function getAdobeStockVolume(keyword: string): Promise<number> {
  try {
    const response = await axios.get(`https://stock.adobe.com/search?k=${encodeURIComponent(keyword)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    const resultsText = $('.search-results-count').text();
    return extractNumber(resultsText);
  } catch (error) {
    console.error('Adobe Stock error:', error);
    return 0;
  }
}

async function getShutterstockVolume(keyword: string): Promise<number> {
  try {
    const response = await axios.get(`https://www.shutterstock.com/search/${encodeURIComponent(keyword)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    const resultsText = $('.MuiTypography-root').first().text();
    return extractNumber(resultsText);
  } catch (error) {
    console.error('Shutterstock error:', error);
    return 0;
  }
}

async function getFreepikVolume(keyword: string): Promise<number> {
  try {
    const response = await axios.get(`https://www.freepik.com/search?format=search&query=${encodeURIComponent(keyword)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    const resultsText = $('.pagination__description').text();
    return extractNumber(resultsText);
  } catch (error) {
    console.error('Freepik error:', error);
    return 0;
  }
}

async function getVecteezyVolume(keyword: string): Promise<number> {
  try {
    const response = await axios.get(`https://www.vecteezy.com/free-vector/${encodeURIComponent(keyword)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    const resultsText = $('.search-results-count').text();
    return extractNumber(resultsText);
  } catch (error) {
    console.error('Vecteezy error:', error);
    return 0;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');
  const platform = searchParams.get('platform');

  if (!keyword || !platform) {
    return NextResponse.json({ error: 'Missing keyword or platform' }, { status: 400 });
  }

  try {
    let volume = 0;

    switch (platform) {
      case 'Adobe Stock':
        volume = await getAdobeStockVolume(keyword);
        break;
      case 'Shutterstock':
        volume = await getShutterstockVolume(keyword);
        break;
      case 'Freepik':
        volume = await getFreepikVolume(keyword);
        break;
      case 'Vecteezy':
        volume = await getVecteezyVolume(keyword);
        break;
      default:
        return NextResponse.json({ error: 'Invalid platform' }, { status: 400 });
    }

    return NextResponse.json({ volume });
  } catch (error) {
    console.error('Search volume error:', error);
    return NextResponse.json({ error: 'Failed to fetch search volume' }, { status: 500 });
  }
} 