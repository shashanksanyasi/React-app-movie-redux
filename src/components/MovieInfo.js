import React, {Component} from 'react';
import {Link} from 'react-router-dom'

const api = 'https://api.themoviedb.org/3'
const apiKey = 'a9632aa4c0a084cd40a2f5f911739ec0'

class MovieInfo extends Component{
    
    state = {
        movieInfo:[]
    }

    componentWillMount(){
        const {movieInfo} = this.state
        let movieId = sessionStorage.getItem('movieId');
        let page = sessionStorage.getItem('Page');
         let url
         url = `${api}/${page}/${movieId}?api_key=${apiKey}&append_to_response=credits`
        
         fetch(url)
         .then((response) => {
             response.json().then((data) => {
                 console.log(data)
             let info
             if (response.status === 200) {
                
             info = {
                tagline: data.tagline,
                poster: data.poster_path,
                genres: data.genres,
                title: data.title,
                name:data.name,
                status: data.status,
                overview: data.overview,
                rating: data.vote_average,
                companies: data.production_companies,
                release: data.release_date,
                startSeries: data.first_air_date,
                background: data.backdrop_path,
                runtime: data.runtime,
                episodeRuntime: data.episode_run_time,
                homepage: data.homepage
             }
            }else{
                info={name: "Sorry couldn't retrieve any data"}
            }
             movieInfo.push(info)
             this.setState({movieInfo})
         })
        })
     
    }

    render(){
        const {movieInfo} = this.state
        let poster,
            title,
            name,
            tagline,
            overview,
            release,
            background,
            runtime,
            status,
            rating,
            startSeries,
            episodeRuntime

          

       movieInfo.map((info) => (
           // eslint-disable-next-line 
            title = info.title,
            name = info.name,
            tagline = info.tagline,
            overview = info.overview,
            runtime = info.runtime,
            status = info.status,
            rating = info.rating,
            startSeries = info.startSeries,
           release = info.release,
           background = `https://image.tmdb.org/t/p/original${info.background}`,
           poster = `https://image.tmdb.org/t/p/w500${info.poster}`
        ))


        const styles = {width: '100%', backgroundImage:background ? (`url(${background})`) : null }
        return(
            <div>
                <section style={styles} className="infoSection ">
                <div className="outer-container">
               <div className="container-box">
                <div className="infoBox"> 
                <div className="poster">
                    <img src={poster} alt="Poster"/>
                </div>
                    <div className="info">
                        <div className="movie-name"><h1>{title}{name}</h1></div>

                        <div className="overview">
                            <h2>{tagline}</h2>
                            <p>{overview}</p>
                        </div>


                    <div className="detail-container">
                        <div className="column">
                            <div className="details">
                                <h3>Original Release</h3>
                                <h2>{release}{startSeries}</h2>
                            </div>
                            <div className="details">
                                <h3>Status</h3>
                                <h2>{status}</h2>
                            </div>
                        </div>
                        <div className="column">
                            <div className="details">
                                <h3>Running Time</h3>
                                <h2>{runtime}{episodeRuntime} min</h2>
                            </div>
                            <div className="details">
                                <h3>Vote Average</h3>
                                <h2>{rating}/10</h2>
                            </div>
                        </div>
                    </div>
                    <div className="links">
                        <div className="li"><Link className="link" to="/">Homepage</Link></div>
                    </div>
                    </div>

                </div>
               </div>
               </div>
                </section>
            </div>
        )
    }
}


export default MovieInfo;
