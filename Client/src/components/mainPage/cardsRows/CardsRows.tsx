import ArtistCard from "../artistCard/ArtistCard";
import "./cardRows.css";
import artists from "../../../types/artists";
import lists from "../../../types/lists";
import album from "../../../types/albums";
import { Link, useParams } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";

interface props {
  title: string | undefined;
  description?: string;
  lists: artists[] | lists[] | album[] | undefined;
  imgBorder: number | string;
  seeAll:boolean;
}

interface prames {
  id?: string;
  type?: string;
}

export default function CardsRows({
  title,
  description,
  lists,
  imgBorder,
  seeAll
}: props) {
  const row = useRef<HTMLDivElement>(null);
  const prames = useParams<prames>();

  const seeAllUrl = () => {
    function isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }
    if (isEmpty(prames)) {
      return `${title}`;
    } else {
      return `${title}/${prames.id}`;
    }
  };

  useEffect(() => {
    row.current?.scroll({ left: 0 });
  }, [prames]);

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <div className="cardRows">
      <div className="cardRows_title">
        <div className="cardRows_titleMain">
          <h1>{title}</h1>
          {description && <h3>{description}</h3>}
        </div>
        {seeAll &&  <Link to={`/seeAll/${seeAllUrl()}`}>
          <p>See all</p>
        </Link>}
       
      </div>

      <div ref={row} className="cardRows_cards">
        {lists?.map((list) => {
          return (
            <ArtistCard
              key={list.id}
              id={list.id}
              mainContant={capitalize(list.name)}
              secondaryContant={capitalize(list.type)}
              image={{
                borderRadius: imgBorder,
                imgUrl: list.images[0]?.url,
              }}
            ></ArtistCard>
          );
        })}
      </div>
    </div>
  );
}
