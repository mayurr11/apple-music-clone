// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Form = () => {
//   const navigate = useNavigate();
//   const [songName, setSongName] = useState("");
//   const [artistName, setArtistName] = useState(""); // New state for artist name
//   const [albumPicture, setAlbumPicture] = useState("");
//   const [songFile, setSongFile] = useState(null);
//   const [lyricsJson, setLyricsJson] = useState(""); // State for raw JSON input

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!songFile) {
//       alert("Please upload a valid song file.");
//       return;
//     }

//     // Parse the lyrics JSON and check if it's valid
//     let parsedLyrics;
//     try {
//       parsedLyrics = JSON.parse(lyricsJson);
//       // Validate the structure of the parsed lyrics
//       if (!Array.isArray(parsedLyrics)) {
//         throw new Error("Lyrics should be an array.");
//       }
//       parsedLyrics.forEach((line) => {
//         if (!line.text || typeof line.start !== "number" || typeof line.end !== "number") {
//           throw new Error("Each lyric should have 'text', 'start', and 'end' properties.");
//         }
//       });
//     } catch (error) {
//       alert("Invalid lyrics JSON format. Please check the format.");
//       return;
//     }

//     const songData = {
//       songName,
//       artistName, // Include artist name in the song data
//       albumPicture,
//       songFile,
//       lyrics: parsedLyrics, // Directly use the parsed lyrics
//     };

//     navigate("/player", { state: songData });
//   };

//   const handleSongFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith("audio/")) {
//       setSongFile(file);
//     } else {
//       alert("Please upload a valid audio file (e.g., .mp3)");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//       <form
//         className="bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-2xl font-bold mb-4">Enter Song Details</h2>

//         {/* Song Name */}
//         <div className="mb-4">
//           <label className="block text-lg">Song Name</label>
//           <input
//             type="text"
//             className="w-full p-2 mt-2 bg-gray-800 text-white rounded-md"
//             placeholder="Enter Song Name"
//             value={songName}
//             onChange={(e) => setSongName(e.target.value)}
//             required
//           />
//         </div>

//         {/* Artist Name */}
//         <div className="mb-4">
//           <label className="block text-lg">Artist Name</label>
//           <input
//             type="text"
//             className="w-full p-2 mt-2 bg-gray-800 text-white rounded-md"
//             placeholder="Enter Artist Name"
//             value={artistName}
//             onChange={(e) => setArtistName(e.target.value)}
//             required
//           />
//         </div>

//         {/* Album Picture URL */}
//         <div className="mb-4">
//           <label className="block text-lg">Album Picture URL</label>
//           <input
//             type="text"
//             className="w-full p-2 mt-2 bg-gray-800 text-white rounded-md"
//             placeholder="Enter Album Picture URL"
//             value={albumPicture}
//             onChange={(e) => setAlbumPicture(e.target.value)}
//             required
//           />
//         </div>

//         {/* Upload Song File */}
//         <div className="mb-4">
//           <label className="block text-lg">Upload Song File</label>
//           <input
//             type="file"
//             accept="audio/*"
//             className="w-full p-2 mt-2 bg-gray-800 text-white rounded-md"
//             onChange={handleSongFileChange}
//             required
//           />
//         </div>

//         {/* Lyrics JSON Input */}
//         <div className="mb-4">
//           <label className="block text-lg">Enter Lyrics as JSON</label>
//           <textarea
//             className="w-full p-2 mt-2 bg-gray-800 text-white rounded-md"
//             placeholder='Enter lyrics in JSON format. Example: [{"text": "XO", "start": 19, "end": 33.6}]'
//             rows="5"
//             value={lyricsJson}
//             onChange={(e) => setLyricsJson(e.target.value)}
//             required
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Form;


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
          throw new Error("Each lyric should have 'text' and 'time' properties.");
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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <form
        className="bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Enter Song Details</h2>

        {/* Song Name */}
        <div className="mb-4">
          <label className="block text-lg">Song Name</label>
          <input
            type="text"
            className="w-full p-2 mt-2 bg-gray-800 text-white rounded-md"
            placeholder="Enter Song Name"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            required
          />
        </div>

        {/* Artist Name */}
        <div className="mb-4">
          <label className="block text-lg">Artist Name</label>
          <input
            type="text"
            className="w-full p-2 mt-2 bg-gray-800 text-white rounded-md"
            placeholder="Enter Artist Name"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            required
          />
        </div>

        {/* Album Picture URL */}
        <div className="mb-4">
          <label className="block text-lg">Album Picture URL</label>
          <input
            type="text"
            className="w-full p-2 mt-2 bg-gray-800 text-white rounded-md"
            placeholder="Enter Album Picture URL"
            value={albumPicture}
            onChange={(e) => setAlbumPicture(e.target.value)}
            required
          />
        </div>

        {/* Upload Song File */}
        <div className="mb-4">
          <label className="block text-lg">Upload Song File</label>
          <input
            type="file"
            accept="audio/*"
            className="w-full p-2 mt-2 bg-gray-800 text-white rounded-md"
            onChange={handleSongFileChange}
            required
          />
        </div>

        {/* Lyrics JSON Input */}
        <div className="mb-4">
          <label className="block text-lg">Enter Lyrics as JSON</label>
          <textarea
            className="w-full p-2 mt-2 bg-gray-800 text-white rounded-md"
            placeholder='Enter lyrics in JSON format. Example: [{"time": 0, "text": "The club isnt the best place to find a lover}]'
            rows="5"
            value={lyricsJson}
            onChange={(e) => setLyricsJson(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
