import React, { useEffect, useState } from "react";

// Define the functional component NewsSection
const NewsSection = () => {
  // Define the state variable 'news' and its updater function 'setNews' using the useState hook
  const [news, setNews] = useState([]);

  // useEffect hook is used to fetch news data when the component mounts
  useEffect(() => {
    const apiKey = "7e07333e33234db8ac28e319fd52cdd4";
    const country = "us"; // You can change the country code as needed

    // Fetch top headlines from the News API using the provided API key and country code
    fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => setNews(data.articles)) // Update the 'news' state with the fetched articles
      .catch((error) => console.error("Error fetching news:", error)); // Handle any fetch errors
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  // Return the JSX content to be rendered in the component
  return (
    <div className="news-section">
      <h3>Real-World News</h3>
      <ul>
        {/* Map over the 'news' array and create a list item for each article */}
        {news.map((article) => (
          <li key={article.url}>
            {/* Create a link to the news article with target="_blank" to open in a new tab */}
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {/* Display the title of the article as the link text */}
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export the NewsSection component as the default export
export default NewsSection;
