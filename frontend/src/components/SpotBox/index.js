import {Link} from 'react-router-dom';
import "./SpotBox.css"

const SpotBox = ({spot}) => {
  return (
      <>
          <div className='spotBox'>
          <Link className='eachSpotsb' to={`/spots/${spot?.id}`}>
          <div className='imgDivsb'>
           <img className='imgSpotsb' src={spot?.previewImage || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"} alt="Image Not Available"/>
           </div>
           <div className='locationReviewssb'>
           <div key={spot?.id} className='citySpotsb'>{spot?.city}, {spot?.state}</div>
           <div className='starSpotsb'>
           <div className="fa-solid fa-star"/>
           {spot?.avgRating}</div>
           </div>
           <div className='priceNightsb'>
           <div className='priceSpotsb'>${spot?.price}</div>
           <div className='nightSpotsb'>night</div>
           </div>
           </Link>
           </div>
    </>
  )
}

export default SpotBox;
