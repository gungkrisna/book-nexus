import React, { useState, useEffect, useCallback } from 'react';
import useAxios from 'axios-hooks';
import axios from 'axios';
import cheerio from 'cheerio';

const BooksFetcher = ({ params, children, refresh }) => {
  const [{ data, loading, error }, refetch] = useAxios({
    url: 'https://librivox.fly.dev/',
    params: Object.keys(params).reduce((acc, key) => {
      if (params[key] !== undefined) {
        acc[key] = params[key];
      }
      return acc;
    }, {}),
  });

  const [bookItems, setBookItems] = useState([]);

  const fetchBookCovers = useCallback(async () => {
    try {
      const books = data?.books || null;

      if (books) {
        const updatedBookItems = await Promise.all(
          books.map(async (book) => {
            const regex = /\/(\d+)$/;
            const match = book.url_rss.match(regex);
            const bookRssId = match && match[1];

            try {
              const response = await axios.get(`https://librivox.fly.dev/rss/${bookRssId}`);
              const $ = cheerio.load(response.data);
              const imageUrl = $('itunes\\:image').attr('href');

              return {
                ...book,
                bookCover: imageUrl,
              };
            } catch (error) {
              console.error(`Error fetching book cover for book with RSS ID ${bookRssId}:`, error);
              return {
                ...book,
                bookCover: null,
              };
            }
          })
        );

        setBookItems(updatedBookItems);
      }
    } catch (error) {
      console.error('Error fetching book data:', error);
      setBookItems([]);
    }
  }, [data]);

  useEffect(() => {
    fetchBookCovers();
  }, [fetchBookCovers]);

  useEffect(() => {
    if (refresh) {
      refetch();
    }
  }, [refresh, refetch]);

  if (error) {
    console.error('Error fetching book data:', error);
  }

  return children({ books: bookItems, loading, error });
};

export default BooksFetcher;