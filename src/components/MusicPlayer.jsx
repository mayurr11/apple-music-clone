// import { useState, useRef, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import ReactPlayer from "react-player";

// const MusicPlayer = () => {
//   const location = useLocation();
//   const { songName, albumPicture, songFile, lyrics, artistName } = location.state;

//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [songUrl, setSongUrl] = useState(null);
//   const [isAudioLoaded, setIsAudioLoaded] = useState(false);

//   const playerRef = useRef(null); // Reference to ReactPlayer
//   const lyricsRefs = useRef([]); // To hold refs for each lyric line

//   // Generate song URL from file
//   useEffect(() => {
//     if (songFile) {
//       const url = URL.createObjectURL(songFile);
//       setSongUrl(url);

//       return () => {
//         if (url) {
//           URL.revokeObjectURL(url);
//         }
//       };
//     }
//   }, [songFile]);

//   useEffect(() => {
//     if (songUrl) {
//       setIsAudioLoaded(true); // Audio is loaded when the URL is available
//     }
//   }, [songUrl]);

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const handleSeek = (e) => {
//     const newTime = parseFloat(e.target.value);
//     setCurrentTime(newTime);
//     playerRef.current.seekTo(newTime, "seconds"); // Seek ReactPlayer
//   };

//   const handleSkip = (amount) => {
//     const newTime = Math.min(Math.max(currentTime + amount, 0), duration);
//     setCurrentTime(newTime);
//     playerRef.current.seekTo(newTime, "seconds"); // Seek ReactPlayer
//   };

//   // Update currentTime during playback
//   const handleTimeUpdate = (state) => {
//     setCurrentTime(state.playedSeconds);
//   };

//   const handleDuration = (duration) => {
//     setDuration(duration);
//   };

//   // Lyrics synchronization logic
//   useEffect(() => {
//     const currentIndex = lyrics.findIndex(
//       (line, index) =>
//         line.time <= currentTime &&
//         (index === lyrics.length - 1 || lyrics[index + 1].time > currentTime)
//     );

//     if (currentIndex !== -1 && lyricsRefs.current[currentIndex]) {
//       lyricsRefs.current[currentIndex].scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//     }
//   }, [currentTime, lyrics]);

//   return (
//     <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
//       {/* Blurred Background */}
//       <div
//         className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-50"
//         style={{ backgroundImage: `url(${albumPicture})` }}
//       ></div>

//       {/* Main Content */}
//       <div className="relative z-10 flex flex-row items-center justify-center gap-x-16 p-6 space-y-10 min-h-screen">
//         {/* Album Art */}
//         <div className="flex-col">
//           <motion.img
//             src={albumPicture}
//             alt={`${songName} Album`}
//             className="w-96 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
//           />
//           <div className="text-center my-6">
//             <h1 className="text-4xl font-bold">{songName}</h1>
//             <h2 className="text-xl font-medium text-gray-400">{artistName}</h2>
//           </div>

//           {/* Progress Bar */}
//           <div className="w-full max-w-lg my-2">
//             <input
//               type="range"
//               min="0"
//               max={duration}
//               value={currentTime}
//               onChange={handleSeek}
//               className="w-full h-1 bg-gray-500 rounded-lg appearance-none cursor-pointer"
//             />
//           </div>

//           {/* Playback Controls */}
//           <div className="flex items-center justify-center space-x-24 my-4">
//             <button
//               onClick={() => handleSkip(-10)}
//               className="text-white bg-transparent hover:text-gray-400 transition duration-300"
//             >
//               <i className="fa-solid fa-backward text-3xl"></i>
//             </button>

//             <button
//               onClick={togglePlay}
//               className="text-white bg-transparent hover:text-gray-400 transition duration-300"
//             >
//               <i
//                 className={`fa-solid fa-${isPlaying ? "pause" : "play"} text-4xl`}
//               ></i>
//             </button>

//             <button
//               onClick={() => handleSkip(10)}
//               className="text-white bg-transparent hover:text-gray-400 transition duration-300"
//             >
//               <i className="fa-solid fa-forward text-3xl"></i>
//             </button>
//           </div>
//         </div>

//         {/* Lyrics Section */}
//         <motion.div
//           className="w-full max-w-4xl bg-transparent bg-opacity-60 p-6 h-96 overflow-y-auto no-scrollbar"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//         >
//           {lyrics.map((line, index) => (
//             <motion.p
//               key={index}
//               ref={(el) => (lyricsRefs.current[index] = el)}
//               className={`text-start text-4xl font-semibold mb-6 ${
//                 line.time <= currentTime &&
//                 (index === lyrics.length - 1 || lyrics[index + 1].time > currentTime)
//                   ? "text-white text-6xl font-bold"
//                   : "text-gray-400 text-2xl"
//               }`}
//               initial={{ opacity: 0 }}
//               animate={{
//                 opacity: line.time <= currentTime ? 1 : 0.5,
//                 scale: line.time <= currentTime ? 1.1 : 1,
//               }}
//               transition={{
//                 opacity: { duration: 0.5 },
//                 scale: line.time <= currentTime ? { duration: 0.5 } : 0,
//               }}
//             >
//               {line.text}
//             </motion.p>
//           ))}
//         </motion.div>

//         {/* ReactPlayer */}
//         {isAudioLoaded && (
//           <ReactPlayer
//             ref={playerRef}
//             url={songUrl}
//             playing={isPlaying}
//             onDuration={handleDuration}
//             onProgress={handleTimeUpdate}
//             onError={() => console.error("Error loading audio file")}
//             width="0"
//             height="0"
//             controls={false}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default MusicPlayer;

import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";

const MusicPlayer = () => {
	const location = useLocation();
	const { songName, albumPicture, songFile, lyrics, artistName } =
		location.state;

	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songUrl, setSongUrl] = useState(null);
	const [isAudioLoaded, setIsAudioLoaded] = useState(false);

	const playerRef = useRef(null);
	const lyricsRefs = useRef([]);

	// Generate song URL from file
	useEffect(() => {
		if (songFile) {
			const url = URL.createObjectURL(songFile);
			setSongUrl(url);

			return () => {
				if (url) {
					URL.revokeObjectURL(url);
				}
			};
		}
	}, [songFile]);

	useEffect(() => {
		if (songUrl) {
			setIsAudioLoaded(true);
		}
	}, [songUrl]);

	const togglePlay = () => {
		setIsPlaying(!isPlaying);
	};

	const handleSeek = (e) => {
		const newTime = parseFloat(e.target.value);
		setCurrentTime(newTime);
		playerRef.current.seekTo(newTime, "seconds");
	};

	const handleSkip = (amount) => {
		const newTime = Math.min(Math.max(currentTime + amount, 0), duration);
		setCurrentTime(newTime);
		playerRef.current.seekTo(newTime, "seconds");
	};

	const handleTimeUpdate = (state) => {
		setCurrentTime(state.playedSeconds);
	};

	const handleDuration = (duration) => {
		setDuration(duration);
	};

	// Lyrics synchronization logic
	useEffect(() => {
		const currentIndex = lyrics.findIndex(
			(line, index) =>
				currentTime >= line.time &&
				(index === lyrics.length - 1 || currentTime < lyrics[index + 1].time)
		);

		if (currentIndex !== -1 && lyricsRefs.current[currentIndex]) {
			lyricsRefs.current[currentIndex].scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	}, [currentTime, lyrics]);

	useEffect(() => {
		if (lyricsRefs.current[0]) {
			lyricsRefs.current[0].scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	}, [lyrics]);

	return (
		<div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
			<div
				className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-50 bg-random-wave"
				style={{ backgroundImage: `url(${albumPicture})` }}
			></div>

			<div className="relative z-10 flex flex-row items-center justify-center gap-x-16 p-6 space-y-10 min-h-screen">
				<div className="flex-col">
					<motion.img
						src={albumPicture}
						alt={`${songName} Album`}
						className="w-96 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
					/>
					<div className="text-center my-6">
						<h1 className="text-4xl font-bold">{songName}</h1>
						<h2 className="text-lg font-medium text-gray-400">{artistName}</h2>
					</div>

					<div className="w-full max-w-lg my-2">
						<input
							type="range"
							min="0"
							max={duration}
							value={currentTime}
							onChange={handleSeek}
							className="w-full h-1 rounded-full appearance-none cursor-pointer"
							style={{
								background: `linear-gradient(to right, #fff ${
									(currentTime / duration) * 100
								}%, #9ca3af ${(currentTime / duration) * 100}%)`,
							}}
						/>
					</div>

					<div className="flex items-center justify-center space-x-24 my-4">
						<button
							onClick={() => handleSkip(-10)}
							className="text-white bg-transparent hover:text-gray-400 transition duration-300"
						>
							<i className="fa-solid fa-backward text-3xl"></i>
						</button>

						<button
							onClick={togglePlay}
							className="text-white bg-transparent hover:text-gray-400 transition duration-300"
						>
							<i
								className={`fa-solid fa-${
									isPlaying ? "pause" : "play"
								} text-4xl`}
							></i>
						</button>

						<button
							onClick={() => handleSkip(10)}
							className="text-white bg-transparent hover:text-gray-400 transition duration-300"
						>
							<i className="fa-solid fa-forward text-3xl"></i>
						</button>
					</div>
				</div>

				<motion.div
					className="w-full max-w-2xl bg-transparent bg-opacity-60 p-6 h-[67vh] min-h-96 overflow-y-auto no-scrollbar"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
				>
					{lyrics.map((line, index) => (
						<motion.p
							key={index}
							ref={(el) => (lyricsRefs.current[index] = el)}
							className={`text-start pl-10 text-4xl font-semibold mb-6 ${
								line.time <= currentTime &&
								(index === lyrics.length - 1 ||
									lyrics[index + 1].time > currentTime)
									? "text-white text-6xl font-bold glow"
									: "text-gray-400 text-2xl"
							}`}
							initial={{ opacity: 0 }}
							animate={{
								opacity: line.time <= currentTime ? 1 : 0.5,
								scale: line.time <= currentTime ? 1.1 : 1,
							}}
							transition={{
								opacity: { duration: 0.5 },
								scale: line.time <= currentTime ? { duration: 0.5 } : 0,
							}}
						>
							{line.text}
						</motion.p>
					))}
				</motion.div>

				{isAudioLoaded && (
					<ReactPlayer
						ref={playerRef}
						url={songUrl}
						playing={isPlaying}
						onDuration={handleDuration}
						onProgress={handleTimeUpdate}
						onError={() => console.error("Error loading audio file")}
						width="0"
						height="0"
						controls={false}
					/>
				)}
			</div>
		</div>
	);
};

export default MusicPlayer;
