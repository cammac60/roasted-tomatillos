import React from 'react';
import './LoadingImage.scss'
import cameraIcon from '../../assets/images/camera.svg'
import filmIcon from '../../assets/images/film-reel.svg'

const LoadingImage = () => {
  return (
    <div className="loading">
      <img src={cameraIcon} alt="camera"/>
      <div className="light"></div>
      <img src={filmIcon} alt="film" className="movie-circle" />
    </div>
  );
}

export default LoadingImage;
