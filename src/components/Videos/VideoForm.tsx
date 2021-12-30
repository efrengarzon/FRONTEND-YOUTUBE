import React, { ChangeEvent, ChangeEventHandler, FormEvent, useState, useEffect } from "react";
import { Video } from "./Video";
import * as VideoService from './VideoService'
import {toast} from 'react-toastify'
import { Params, useNavigate, useParams } from 'react-router-dom';

type InputChange =  ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface params {
  id: string;
}

const VideoForm = () => {
   
  const navigate = useNavigate();
  const params = useParams<Params>();
  
  console.log(params);
  

  const inicialState = {
    title: "",
    description: "",
    url: "",
  }
  const [Video, setVideo] = useState<Video>(inicialState);
  const handleInputChange = ( e: InputChange)=> {
    setVideo ({...Video, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!params.id){
      await VideoService.createVideo(Video);
      toast.success('New video added')
      setVideo(inicialState)
    }else {
      await VideoService.updateVideo(params.id, Video)
      
    }
    
    navigate('/')

  }

  const getVideo = async (id: string) => {
    const res = await VideoService.getVideo(id);
    const {title, description, url } = res.data;
    setVideo({title, description, url})
  }

  useEffect(()=> {
    if (params.id) getVideo(params.id);
  }, []) 

  return (
    <div>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="card">
            <div className="card-body">
              <h3>New Video</h3>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="title"
                    placeholder="Write a title fro this video"
                    className="form-control"
                    onChange={handleInputChange}
                    value={Video.title}
                    autoFocus
                  />
                </div>
                <div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="url"
                      placeholder="https://somesite.com"
                      className="form-control"
                      onChange={handleInputChange}
                      value={Video.url}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="description"
                      rows={3}
                      className="form-control"
                      placeholder="Write a description"
                      onChange={handleInputChange}
                      value={Video.description}                    
                    ></textarea>
                  </div>
                </div>
                {
                  params.id ?
                  <button className="btn btn-info">UpDated Video</button>
                  :
                  <button className="btn btn-primary">Create Video</button>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoForm;
