import React, { useEffect, useState } from 'react';
import Auth from './components/auth';
import {db, auth, storage} from './config/firebase'; 
import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";


const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isoscar, setIsoscar] = useState(false);

  // Update Title State
  const [updateTitle, setUpdateTitle] = useState('');
  
  // File Upload State
  const [fileUpload, setFileUpload] = useState(null);

  const movieCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const datax = await getDocs(movieCollectionRef);
      const filterData = datax.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filterData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, [])

  const submitMovie = async() => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        ReleaseDate: newReleaseDate,
        oscar: isoscar,
        userId: auth?.currentUser?.uid
      })
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  }
  
  const deleteMovie = async(id) => {
   const movieDoc = doc(db, "movies", id);
    await  deleteDoc(movieDoc);
    getMovieList();
  }

  const updateMovie = async(id) => {
   const movieDoc = doc(db, "movies", id);
    await  updateDoc(movieDoc, {title : updateTitle});
    getMovieList();
  }

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h2>Movie Hub</h2>
      <Auth />

      <div className="form-inline">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Movie name..."
            onChange={(e) => setNewMovieTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <input type="number" className="form-control" placeholder="Release date..."
            onChange={(e) => setNewReleaseDate(Number(e.target.value))} />
        </div>
        <div className="form-check">
          <label className="form-check-label">
            <input type="checkbox" className="form-check-input mx-1" value="checkedValue" checked={isoscar} onChange={(e) => setIsoscar(e.target.checked)} />
            Recieved Oscar
          </label>
        </div>

        <div className="form-group">
          <button onClick={submitMovie} className="form-control btn-sm btn-success mx-1">Submit Movie</button>
        </div>
      </div>


      <div >
        {movieList.map((movie, idx)=>(
          <div key = {idx}>
            <h1 style={{ color: movie.oscar ? "green" : "red" }}>{movie.title}</h1>
            <p>Date : {movie.ReleaseDate}</p>
            <div className="form-inline">
              <input type="text" onChange={(e) => setUpdateTitle(e.target.value)} className="form-control mx-1" placeholder='New title...' />
              <button onClick={() => updateMovie(movie.id)} className='btn btn-sm btn-secondary'>update</button>
              <button onClick={() => deleteMovie(movie.id)} className='btn btn-sm btn-danger mx-1'>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} className="form-control my-3" />
        <button onClick={uploadFile} className="form-control btn-sm btn-warning" > Upload File </button>
      </div>

    </>
  );
};

export default App;
