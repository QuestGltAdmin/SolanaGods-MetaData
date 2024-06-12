import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function QueryHandler({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const twclid = searchParams.get("twclid");

    // Store twclid in localStorage if present in the URL
    if (twclid) {
      localStorage.setItem("twclid", twclid);
    }

    // Retrieve twclid from localStorage
    const storedTwclid = localStorage.getItem("twclid");

    // If twclid is in localStorage and not in the URL, add it to the URL
    if (storedTwclid && !searchParams.has("twclid")) {
      searchParams.set("twclid", storedTwclid);
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    }

    // If twclid is removed from localStorage, remove it from the URL
    if (!storedTwclid && searchParams.has("twclid")) {
      searchParams.delete("twclid");
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    }
  }, [location, navigate]);

  return children;
}

export default QueryHandler;
