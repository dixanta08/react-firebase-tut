import { useEffect, useState } from "react";
import { Auth } from "./components/auth";
import { db,auth,storage } from "./config/firebase-config";
import {
  collection,doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import {ref, uploadBytes} from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);

  const [fileUpload, setFileUpload] = useState(null);
  //new movie sets
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieReleasedDate, setNewMovieReleasedDate] = useState(0);
  const [hasNewMovieOscar, setHasNewMovieOscar] = useState(false);


  const [updateMovieTitle,setUpdateMovieTitle]= useState("");
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filtered_data = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filtered_data);

      setMovieList(filtered_data);
    } catch (err) {
      console.error(err);
    }
  };
  const moviesCollectionRef = collection(db, "movies");
  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newMovieReleasedDate,
        recievedOscar: hasNewMovieOscar,
        userId:auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    try {
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (e) {
      console.error(e);
    }
  };

  
  const updateMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    try {
      await updateDoc(movieDoc,{title:updateMovieTitle});
      getMovieList();
    } catch (e) {
      console.error(e);
    }
  };

  const uploadFile = async()=>{
    if (!fileUpload) return;

    const fileFolderRef =  ref(storage, `projectFolder/$(fileUpload.name)`);
    try{
      await uploadBytes(fileFolderRef,fileUpload);
    }catch(e){
      console.error(e);
    }
  }
  return (
    <>
      <Auth />
      <br />
      <div>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Released Date"
          onChange={(e) => setNewMovieReleasedDate(Number(e.target.value))}
        />
        <br />
        <input
          type="checkbox"
          // checked={hasNewMoviewOscar}
          onChange={(e) => setHasNewMovieOscar(e.target.checked)}
        />{" "}
        <label>Recieved Oscar?</label> <br />
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.title}>
            <h2 style={{ color: movie.recievedOscar ? "green" : "red" }}>
              {movie.title}
            </h2>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>

            {/* update part  if i type on one movie and click update on another naother movie changes because they are usign same state create seperate stsate to solve this issue*/}
            <input type="text" placeholder="New Title" onChange={e=> setUpdateMovieTitle(e.target.value)}/>
            <button onClick={()=> updateMovie(movie.id )}>Update Movie</button>

            <div>
              <input type="file"  onChange={e=> setFileUpload(e.target.files[0])}/>
              <button onClick={uploadFile}>Upload File</button>
            </div>

          </div>
        ))}
      </div>
    </>
  );
}

export default App;
