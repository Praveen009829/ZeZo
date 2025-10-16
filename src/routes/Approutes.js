import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import MovieDetail from "../Pages/Moviedetail/Moviedetail";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/SignUp/Signup";
import TvShow from "../Pages/Tvshows/TvShow";
import Movies from "../Pages/Movies/Movies";
import Search from "../Pages/Search/Search";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/tvshows" element={<TvShow/>}/>
    <Route path="/movies" element={<Movies/>}/>
    <Route path="/detail/:type/:id" element={<MovieDetail />} />
    <Route path="/search/:query" element={<Search/>} />
  </Routes>
);

export default AppRoutes;
