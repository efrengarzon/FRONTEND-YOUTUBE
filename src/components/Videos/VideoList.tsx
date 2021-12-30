import React, { useEffect, useState } from 'react'
import { Video } from './Video'
import * as videoService from './VideoService'
import VideoItem from './VideoItem'



function VideoList() {
    
    const [videos, setVideos] = useState<Video[]>([])

    const loadVideos = async () => {
        const res = await videoService.getVideos()
        const formatedVideo = res.data.map(Video => {
            return {
                ...Video,
                createAt: Video.createAt ? new Date(Video.createAt): new Date(),
                updatedAt: Video.updatedAt ? new Date(Video.updatedAt): new Date(),
            }

        })  
        .sort((a, b) => b.createAt.getTime() - a.createAt.getTime());
        
        setVideos(formatedVideo);
    }
    
    useEffect( () => {
       loadVideos()
    }, [])

    return (
        <div className="row">
           {videos.map((video) =>{
              return <VideoItem video={video} key={video._id} loadVideos={loadVideos}/>
      })}
           
        </div>
    )
}

export default VideoList 
