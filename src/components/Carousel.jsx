import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function Carousel(props) {
  const [articles, setArticles] = useState([]);
  const [apiLimitReached, setApiLimitReached] = useState(false);

  const updateNews = async () => {
    const url = `https://gnews.io/api/v4/top-headlines?lang=en&max=5&apikey=${props.apiKey}`;
    try {
      const response = await fetch(url);

      if (response.status === 403) {
        setApiLimitReached(true);
      } else {
        setApiLimitReached(false);
        const data = await response.json();
        setArticles(data.articles);
      }
    } catch (error) {
      setArticles([]);
      setApiLimitReached(false);
    }
  };

  useEffect(() => {
    updateNews();
  }, []);

  useEffect(() => {
    if (articles.length === 5) {
      $(document).ready(function () {
        $(".owl-carousel").owlCarousel({
          margin: 10,
          nav: true,
          loop: true,
          autoplay: true,
          autoplayTimeout: 3000,
          autoplayHoverPause: true,
          center: true,
          navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>",
          ],
          responsive: {
            0: {
              items: 1,
            },
            600: {
              items: 1,
            },
            1000: {
              items: 3,
            },
          },
        });
      });
    }
  }, [articles]);

  return (
    <>
      {apiLimitReached ? (
        <div className="col-md-12">
          <div className="my-3 alert alert-danger text-center">
            API limit reached. Please try again after 00:00 UTC.
          </div>
        </div>
      ) : (
        <section id="slider" className="pt-5">
          <div className="container">
            <div className="slider">
              <div className="owl-carousel">
                {articles.map((article, index) => (
                  <div className="slider-card" key={index}>
                    <a rel="noreferrer" href={article?.url} target="_blank">
                      <div className="d-flex justify-content-center align-items-center mb-4">
                        <img
                          src={
                            article?.image == null
                              ? "/src/assets/images/no-picture-available.jpg"
                              : article?.image
                          }
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src =
                              "/src/assets/images/no-picture-available.jpg";
                          }}
                          style={{ height: "250px" }}
                          alt=""
                        />
                      </div>
                      <h5 className="mb-0 text-center">
                        <b>{article?.title}</b>
                      </h5>
                      <p className="text-center p-4">{article?.description}</p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

Carousel.defaultProps = {
  pageSize: 5,
  category: "general",
};

Carousel.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
