import { useState, useEffect, useRef } from "react";
import "./SpaceVideoModal.css";

export default function SpaceVideoModal({ onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolume, setShowVolume] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // قفل کردن اسکرول صفحه اصلی
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent);
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percent = x / width;
    video.currentTime = percent * video.duration;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-video-modal-overlay" onClick={onClose}>
      <div className="space-video-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="space-video-modal-content">
          <button className="space-video-modal-close" onClick={onClose}>✕</button>
          
          <div className="space-video-header">
            <span className="space-video-icon">🏠✨</span>
            <h2 className="space-video-title">فضای دلنشین کافه ما</h2>
            <p className="space-video-subtitle">گرمی و صمیمیت را در کنار بهترین قهوه‌ها تجربه کنید</p>
          </div>

          <div className="custom-video-container">
            <video 
              ref={videoRef}
              id="coffee-video"
              className="coffee-ambient-video"
              autoPlay
              loop
              playsInline
              poster="/images/cafe-front.jpg"
            >
              <source src="/videos/coffee-shop-walkthrough.mp4" type="video/mp4" />
              مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
            </video>

            {/* پلیر سفارشی */}
            <div className="custom-video-player">
              {/* نوار پیشرفت */}
              <div className="progress-bar-container" onClick={handleProgressClick}>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                  <div className="progress-handle" style={{ left: `${progress}%` }}></div>
                </div>
              </div>

              {/* دکمه‌های کنترل */}
              <div className="player-controls">
                <button className="player-btn play-btn" onClick={togglePlay}>
                  {isPlaying ? "⏸️" : "▶️"}
                </button>

                <div className="time-display">
                  <span className="current-time">{formatTime(videoRef.current?.currentTime || 0)}</span>
                  <span className="time-separator">/</span>
                  <span className="duration">{formatTime(videoRef.current?.duration || 0)}</span>
                </div>

                <div className="volume-control">
                  <button 
                    className="player-btn volume-btn" 
                    onClick={() => setShowVolume(!showVolume)}
                  >
                    {volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
                  </button>
                  {showVolume && (
                    <div className="volume-slider-container">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="volume-slider"
                        orient="vertical"
                      />
                    </div>
                  )}
                </div>

                <button className="player-btn fullscreen-btn" onClick={() => {
                  const video = videoRef.current;
                  if (video.requestFullscreen) {
                    video.requestFullscreen();
                  }
                }}>
                  ⛶
                </button>
              </div>
            </div>
          </div>

          <div className="video-description">
            <div className="desc-item">
              <span className="desc-icon">☕</span>
              <span>قهوه‌های تازه و باکیفیت</span>
            </div>
            <div className="desc-item">
              <span className="desc-icon">🎨</span>
              <span>طراحی دلنشین ایرانی - مدرن</span>
            </div>
            <div className="desc-item">
              <span className="desc-icon">🌿</span>
              <span>فضای آرامش‌بخش با گیاهان طبیعی</span>
            </div>
          </div>

          <div className="space-video-footer">
            <p>❤️ منتظر شما هستیم تا لحظات خوشی را کنار هم بسازیم ❤️</p>
            <p className="visit-time">🕐 همه روزه از ۹ صبح تا ۱۲ شب</p>
          </div>
        </div>
      </div>
    </div>
  );
}