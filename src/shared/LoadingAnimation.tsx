import React from 'react'
import './LoadingAnimation.css'

export default function LoadingAnimation() {
  return (
    <div className="d-flex gap-1 justify-content-center align-items-center">
        Loading
        <div className="loading-box1"></div>
        <div className="loading-box2"></div>
        <div className="loading-box3"></div>
    </div>
  )
}
