import {Link} from 'react-router-dom';
import "./SpotBox.css"

const SpotBox = ({spot}) => {

  function randomInt(max) {
    // Random int function
    return Math.floor(Math.random()*max)
  }

  function randomInt2(min, max) {
    // Set a min and max parameters
    return Math.random() * (max - min) + min;
  }

  let date = Date()

  function curDay2(date) {
    let cd = date.slice(8,10)
    if (cd[0] === 0) return date.slice(9,10)
    else return cd;
  }

  let curMonth = date.slice(4,8)
  let curDay = curDay2(date)
  let miles = randomInt(200)
  let date2 = Math.ceil(randomInt2(parseInt(curDay),30))
  return (
      <>
          <div className='spotBox'>
          <Link key={spot?.id} className='eachSpot' to={`/spots/${spot?.id}`}>
          <div className='imgDiv'>
           <img className='imgSpot' src={spot?.previewImage ? spot?.previewImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"} alt="Image Not Available"/>
           </div>
           <div className='locationReviews'>
           <div key={spot?.id} className='citySpot'>{spot?.city}, {spot?.state}</div>
           <div className='starSpot'>
           <div className="fa-solid fa-star"/>
           {spot?.avgRating}</div>
           </div>
            <div className='miles'>{miles} miles away</div>
            <div className='bookedDay'>{curMonth} {curDay} – {date2}</div>
           <div className='priceNight'>
           <div className='priceSpot'>${spot?.price}</div>
           <div className='nightSpot'>night</div>
           </div>
           </Link>
           </div>
    </>
  )
}

export default SpotBox;
