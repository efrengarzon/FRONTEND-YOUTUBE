import React from "react";
import { Video } from "./Video";
import ReactPlayer from "react-player";
import {useNavigate} from 'react-router-dom'
import * as videoService from './VideoService'

import "./VideoItem.css";

interface Props {
  video: Video;
  loadVideos: () => void;
}
const VideoItem = ({ video, loadVideos }: Props) => {
  const Navegate = useNavigate();

  const handleDelete = async (id: string) => {
    await videoService.deleteVideo(id);
    loadVideos();
  }

  return (
    <div className="col-md-4">
      <div
        className="card card-body video-card"
        style={{ cursor: "ouinter" }}
        
      >
        <div className="d-flex justify-content-between">
          <h1
          onClick={() => Navegate(`/update/${video._id}`)}
          >{video.title}</h1>
          <span className="text-danger" onClick={() => video._id && handleDelete(video._id) }>
            x</span>
        </div>
        <p>{video.description}</p>
        <div className="ratio ratio-16x9">
          <ReactPlayer url={video.url} width="100%" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
