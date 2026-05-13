import React, { useRef, useState, useEffect } from 'react'
import { SongContext } from '../song.context'
import '../style/player.scss'
import { useSong } from '../hooks/useSongs'

const Player = () => {
    const { song } = useSong()
    const audioRef = useRef(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [speed, setSpeed] = useState(1)
    const [volume, setVolume] = useState(0.7)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const updateTime = () => setCurrentTime(audio.currentTime)
        const updateDuration = () => setDuration(audio.duration)
        const handleEnded = () => setIsPlaying(false)

        audio.addEventListener('timeupdate', updateTime)
        audio.addEventListener('loadedmetadata', updateDuration)
        audio.addEventListener('ended', handleEnded)

        return () => {
            audio.removeEventListener('timeupdate', updateTime)
            audio.removeEventListener('loadedmetadata', updateDuration)
            audio.removeEventListener('ended', handleEnded)
        }
    }, [])

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleBackward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5)
        }
    }

    const handleForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 5)
        }
    }

    const handleSpeedChange = (e) => {
        const newSpeed = parseFloat(e.target.value)
        setSpeed(newSpeed)
        if (audioRef.current) {
            audioRef.current.playbackRate = newSpeed
        }
    }

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value)
        setVolume(newVolume)
        if (audioRef.current) {
            audioRef.current.volume = newVolume
        }
    }

    const handleProgressChange = (e) => {
        const newTime = parseFloat(e.target.value)
        setCurrentTime(newTime)
        if (audioRef.current) {
            audioRef.current.currentTime = newTime
        }
    }

    const formatTime = (time) => {
        if (!time || isNaN(time)) return '0:00'
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    return (
        <div className="player-container">
            <audio
                ref={audioRef}
                src={song.url}
                onLoadedMetadata={() => {
                    if (audioRef.current) {
                        audioRef.current.volume = volume
                        audioRef.current.playbackRate = speed
                    }
                }}
            />

            <div className="player-card">
                <div className="player-content">
                    {/* Song Poster on Left */}
                    <div className="player-poster">
                        <img src={song.posterUrl} alt={song.title} />
                        <div className="mood-badge">{song.mood}</div>
                    </div>

                    {/* Controls on Right */}
                    <div className="player-controls">
                        {/* Song Info */}
                        <div className="player-info">
                            <h3 className="song-title">{song.title}</h3>
                        </div>

                        {/* Progress Bar */}
                        <div className="progress-section">
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime}
                                onChange={handleProgressChange}
                                className="progress-bar"
                            />
                            <div className="time-display">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Main Controls */}
                        <div className="main-controls">
                            <button
                                className="control-btn backward-btn"
                                onClick={handleBackward}
                                title="Backward 5 seconds"
                            >
                                <span>⏮</span> 5s
                            </button>

                            <button
                                className={`control-btn play-btn ${isPlaying ? 'playing' : ''}`}
                                onClick={handlePlayPause}
                                title={isPlaying ? 'Pause' : 'Play'}
                            >
                                {isPlaying ? '⏸' : '▶'}
                            </button>

                            <button
                                className="control-btn forward-btn"
                                onClick={handleForward}
                                title="Forward 5 seconds"
                            >
                                5s <span>⏭</span>
                            </button>
                        </div>

                        {/* Secondary Controls */}
                        <div className="secondary-controls">
                            <div className="volume-control">
                                <span>🔊</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="volume-slider"
                                />
                                <span>{Math.round(volume * 100)}%</span>
                            </div>

                            <div className="speed-control">
                                <label htmlFor="speed-select">Speed:</label>
                                <select
                                    id="speed-select"
                                    value={speed}
                                    onChange={handleSpeedChange}
                                    className="speed-select"
                                >
                                    <option value={0.5}>0.5x</option>
                                    <option value={0.75}>0.75x</option>
                                    <option value={1}>1x</option>
                                    <option value={1.25}>1.25x</option>
                                    <option value={1.5}>1.5x</option>
                                    <option value={2}>2x</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Player