import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
	const navigate = useNavigate();
	const [songName, setSongName] = useState("");
	const [artistName, setArtistName] = useState(""); // New state for artist name
	const [albumPicture, setAlbumPicture] = useState("");
	const [songFile, setSongFile] = useState(null);
	const [lyricsJson, setLyricsJson] = useState(""); // State for raw JSON input

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!songFile) {
			alert("Please upload a valid song file.");
			return;
		}

		// Parse the lyrics JSON and check if it's valid
		let parsedLyrics;
		try {
			parsedLyrics = JSON.parse(lyricsJson);
			// Validate the structure of the parsed lyrics
			if (!Array.isArray(parsedLyrics)) {
				throw new Error("Lyrics should be an array.");
			}
			parsedLyrics.forEach((line) => {
				if (!line.text || typeof line.time !== "number") {
					throw new Error(
						"Each lyric should have 'text' and 'time' properties."
					);
				}
			});
		} catch (error) {
			alert("Invalid lyrics JSON format. Please check the format.");
			return;
		}

		const songData = {
			songName,
			artistName, // Include artist name in the song data
			albumPicture,
			songFile,
			lyrics: parsedLyrics, // Directly use the parsed lyrics
		};

		navigate("/player", { state: songData });
	};

	const handleSongFileChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith("audio/")) {
			setSongFile(file);
		} else {
			alert("Please upload a valid audio file (e.g., .mp3)");
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black flex items-center justify-center p-4">
			<form
				className="bg-black text-white p-6 sm:p-8 md:p-10 rounded-lg shadow-xl border border-gray-700 max-w-md w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl transform transition-all"
				onSubmit={handleSubmit}
			>
				<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center text-white">
					Enter Song Details
				</h2>

				{/* Song Name */}
				<div className="mb-6">
					<label className="block text-lg sm:text-xl font-semibold">
						Song Name
					</label>
					<input
						type="text"
						className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter Song Name"
						value={songName}
						onChange={(e) => setSongName(e.target.value)}
						required
					/>
				</div>

				{/* Artist Name */}
				<div className="mb-6">
					<label className="block text-lg sm:text-xl font-semibold">
						Artist Name
					</label>
					<input
						type="text"
						className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter Artist Name"
						value={artistName}
						onChange={(e) => setArtistName(e.target.value)}
						required
					/>
				</div>

				{/* Album Picture URL */}
				<div className="mb-6">
					<label className="block text-lg sm:text-xl font-semibold">
						Album Picture URL
					</label>
					<input
						type="text"
						className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter Album Picture URL"
						value={albumPicture}
						onChange={(e) => setAlbumPicture(e.target.value)}
						required
					/>
				</div>

				{/* Upload Song File */}
				<div className="mb-6">
					<label className="block text-lg sm:text-xl font-semibold">
						Upload Song File
					</label>
					<input
						type="file"
						accept="audio/*"
						className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						onChange={handleSongFileChange}
						required
					/>
				</div>

				{/* Lyrics JSON Input */}
				<div className="mb-6">
					<label className="block text-lg sm:text-xl font-semibold">
						Enter Lyrics as JSON
					</label>
					<textarea
						className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder='Enter lyrics in JSON format. Example: [{"time": 0, "text": "The club isnt the best place to find a lover"}]'
						rows="5"
						value={lyricsJson}
						onChange={(e) => setLyricsJson(e.target.value)}
						required
					/>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg transform transition duration-300"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Form;
