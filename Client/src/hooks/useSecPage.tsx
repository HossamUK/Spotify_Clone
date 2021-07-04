import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function useSecPage(id: string, type: string) {
  const [info, setInfo] = useState();
  const [tracks, setTracks] = useState();
  const [albums, setAlbums] = useState();
  const [relatedArtists, setRelatedArtists] = useState();
  const user = useSelector((state: any) => state.user);
  const Spotfiy = useSelector((state: any) => {
    return state.spotfiy;
  });

  useEffect(() => {
    if (id && type) {
      if (type.toLowerCase() == "artist") {
        Spotfiy.getArtist(id)
          .then((res) => {
            setInfo(res.body);
          })
          .catch((err) => {
            console.log(err);
          });

        Spotfiy.getArtistTopTracks(id, user.country)
          .then((res) => {
            setTracks(res.body.tracks);
          })
          .catch((err) => {
            console.log(err);
          });

        Spotfiy.getArtistAlbums(id)
          .then((res) => {
            setAlbums(res.body.items);
          })
          .catch((err) => {
            console.log(err);
          });

        Spotfiy.getArtistRelatedArtists(id)
          .then((res) => {
            setRelatedArtists(res.body.artists);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (type.toLowerCase() == "album") {
        Spotfiy.getAlbum(id)
          .then((res) => {
            let newTracks;
            newTracks = res.body.tracks.items.map((item) => {
              item["album"] = res.body;
              return item;
            });

            setInfo(res.body);
            setTracks(newTracks);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (type.toLowerCase() == "playlist") {
        Spotfiy.getPlaylist(id)
          .then((res) => {
            setInfo(res.body);
            setTracks(
              res.body.tracks.items.map((item) => {
                return item.track;
              })
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [id, type]);

  return {
    info,
    tracks,
    lists:
      type.toLowerCase() === "artist"
        ? [
            { name: "Albums", list: albums },
            { name: "Related Artist", list: relatedArtists },
          ]
        : undefined,
  };
}
