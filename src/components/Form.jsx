import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [songName, setSongName] = useState("");
  const [albumPicture, setAlbumPicture] = useState("");
  const [songFile, setSongFile] = useState(null);
  const [lyrics, setLyrics] = useState([{ text: "", time: "" }]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!songFile) {
      alert("Please upload a valid song file.");
      return;
    }

    const songData = {
      songName,
      albumPicture,
      songFile,
      lyrics: lyrics.map((line) => ({
        time: parseInt(line.time, 10),
        text: line.text,
      })),
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

  const handleAddLyric = () => {
    setLyrics([...lyrics, { text: "", time: "" }]);
  };

  const handleLyricChange = (index, field, value) => {
    const updatedLyrics = [...lyrics];
    updatedLyrics[index][field] = value;
    setLyrics(updatedLyrics);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <form
        className="bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Enter Song Details</h2>
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
        <div className="mb-4">
          <label className="block text-lg">Enter Lyrics with Time</label>
          {lyrics.map((lyric, index) => (
            <div key={index} className="flex items-center mb-4 space-x-4">
              <input
                type="number"
                className="w-20 p-2 bg-gray-800 text-white rounded-md"
                placeholder="Time (s)"
                value={lyric.time}
                onChange={(e) => handleLyricChange(index, "time", e.target.value)}
                required
              />
              <textarea
                className="w-full p-2 bg-gray-800 text-white rounded-md"
                placeholder="Enter lyric text"
                rows="2"
                value={lyric.text}
                onChange={(e) => handleLyricChange(index, "text", e.target.value)}
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddLyric}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full"
          >
            Add Lyric
          </button>
        </div>
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
