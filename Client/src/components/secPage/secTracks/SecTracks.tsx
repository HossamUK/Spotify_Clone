import SecAdd from "../secAdd/SecAdd";
import SecTrack from "./secTack/SecTrack";
import "./secTracks.css";
import tracks from "../../../types/tracks";
import album from "../../../types/albums";
import artists from "../../../types/artists";
import lists from "../../../types/lists";
import CardsRows from "../../mainPage/cardsRows/CardsRows";
import { useParams } from "react-router-dom";

interface rows {
  name: string;
  list: album[] | artists[] | lists[] | undefined | null;
}

interface props {
  tracks?: tracks[] | null;
  lists?: rows[] | null;
}
interface params {
  type: string;
  id: string;
}

export default function SecTracks({ tracks, lists }: props) {
  const params = useParams<params>();

  return (
    <div className="secTracks">
      {params.type != "category" && tracks?.length ? <SecAdd></SecAdd> : null}
      {params.type != "category" && tracks?.length ? <h3>Tracks</h3> : null}

      {tracks?.map((track, index) => {
        return (
          <SecTrack
            key={track.id}
            id={track.id}
            type={track.type}
            duration_ms={track.duration_ms}
            name={track.name}
            album={track.album}
            number={index + 1}
            preview_url={track.preview_url}
          ></SecTrack>
        );
      })}
      {lists?.map((row, index) => {
        if (row.list?.length) {
          return (
            <CardsRows
              key={index}
              lists={row.list?.length ? row.list : undefined}
              title={row.list?.length ? row.name : undefined}
              imgBorder={
                row.list?.length && row.list[0].type == "artist" ? 50 : 2
              }
              seeAll={true}
            ></CardsRows>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
