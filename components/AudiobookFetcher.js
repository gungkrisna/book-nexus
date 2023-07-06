import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

export default function AudiobookFetcher({ bookRssId }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchAudiobooks = async () => {
      try {
        const response = await axios.get(`https://librivox.fly.dev/rss/${bookRssId}`);

        if (response && response.data) {
          const xmlData = response.data;

          const $ = cheerio.load(xmlData);
          const itemArray = [];

          $('item').each((index, element) => {
            const title = $(element).find('title').text();
            const mp3Url = $(element).find('enclosure').attr('url');
            const duration = $(element).find('itunes\\:duration').text();

            itemArray.push({
              title,
              mp3Url,
              duration,
            });
          });

          setItems(itemArray);
        }
      } catch (error) {
        console.error('Error fetching audiobooks:', error);
      }
    };

    fetchAudiobooks();
  }, [bookRssId]);

  return items;
}
