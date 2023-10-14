import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [apiLimitReached, setApiLimitReached] = useState(false);

  // this solves direct url search approach
  const searchParams = new URLSearchParams(location.search);
  const term = searchParams.get("q") == null ? null : searchParams.get("q");

  // // this can also be used
  // const term = location.state;

  function getCountry() {
    let user = JSON.parse(localStorage.getItem("userlogdata"));
    let country = user.data.country;
    let code;

    switch (country) {
      case "India":
        code = "in";
        break;
      case "USA":
        code = "us";
        break;
      case "Great Britain":
        code = "gb";
        break;
      case "Singapore":
        code = "sg";
        break;
      case "Canada":
        code = "ca";
        break;
      case "Australia":
        code = "au";
        break;
    }
    return code;
  }

  const updateNews1 = async () => {
    try {
      const url =
        props.search == "2"
          ? `https://gnews.io/api/v4/top-headlines?lang=en&country=${getCountry()}&max=${
              props.pageSize
            }&apikey=${props.apiKey}`
          : `https://gnews.io/api/v4/top-headlines?lang=en&category=${props.category}&max=${props.pageSize}&apikey=${props.apiKey}`;
      const response = await fetch(url);

      if (response.status === 403) {
        setApiLimitReached(true)
      } else {
        setApiLimitReached(false);
        const data = await response.json();
        setArticles(data.articles);
      }
    } catch (error) {
      setApiLimitReached(false);
    }
  };
  const updateNews2 = async () => {
    if (term == null) {
    } else {
      try {
        const url = `https://gnews.io/api/v4/search?lang=en&q=${term}&sortBy=publishedAt&max=${props.pageSize}&in=title,description&apikey=${props.apiKey}`;
        const response = await fetch(url);

        if (response.status === 403) {
          setApiLimitReached(true);
        } else {
          setApiLimitReached(false);
          const data = await response.json();
          setArticles(data.articles);
        }
      } catch (error) {
        setApiLimitReached(false);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (props.search === "1") {
        await updateNews2();
      } else {
        await updateNews1();
      }

      setLoading(false);
    };

    fetchData();
  }, [term]);

  return (
    <div>
      <div className="container">
        <div className="row">
          {loading ? (
            <div className="col-md-12">
              <div className="my-3 alert alert-info text-center">
                Loading Articles...
              </div>
            </div>
          ) : articles.length === 0 ? apiLimitReached ? (
            <div className="col-md-12">
              <div className="my-3 alert alert-danger text-center">
                API limit reached. Please try again after 00:00 UTC.
              </div>
            </div>
          ): (
            <div className="col-md-12">
              <div className="my-3 alert alert-danger text-center">
                Invalid search term
              </div>
            </div>
          ) : (
            articles.map((element) => {
              return (
                <div className="col-md-4 my-2" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.image}
                    newsUrl={element.url}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
