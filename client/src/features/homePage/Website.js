import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { setSelectedWebsite } from "../../app/uiSlice"
import { useState } from "react"


export const Website = ({ website }) => {

    const [imageExists, setImageExists] = useState(true)
    const user = useSelector(state => state.uiReducer.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onEditClicked = () => {
        dispatch(setSelectedWebsite(website))
        navigate('/edit')
    }
    const {
        name,
        url,
        description,
        categories,
        tags
    } = website


    const handleImageError = () => {
        setImageExists(false)
    }

    const imageSrc = `/images/${url.split('//')[1].replace('www.', '').split('.')[0] + ".png"}`



    return (
        <div className="col card-height">
            <div className="card">
                {imageExists
                    ? (<img src={imageSrc} className="card-img-top" onError={handleImageError} alt="img header" />)
                    : (<img src="/images/default.png" className="card-img-top" alt="img header" />)
                }

                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    {/* <h6 className="card-subtitle">{url}</h6> */}
                    <div className="card-text overflow-auto" style={{ minHeight: 'calc(1.5em * 4)', maxHeight: 'calc(1.5em * 4)' }}>
                        <p >{description}</p>
                    </div>


                    <a href={url} className="btn me-2" target="_blank"><b className="fas fa-link">Visit Site</b></a>
                    {user.id !== 0 && <a href={'tmp'} className="btn me-2" target="_blank"><b className="fab fa-like">Add to Favorites</b></a>}
                    {user.role === 'admin' && <a className="btn me-2" onClick={onEditClicked}><b className="fab fa-edit">Edit</b></a>}

                </div>
            </div>
        </div>
    )

}