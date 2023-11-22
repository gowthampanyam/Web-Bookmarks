import { useGetWebsitesQuery } from "../api/apiSlice"
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from "react-redux";
import { Website } from "./Website";








export const WebsiteContainer = () => {

    const { data: websites = [], isLoading } = useGetWebsitesQuery()
    const selectedCategories = useSelector(state => state.uiReducer.selectedCategories)
    const selectedTags = useSelector(state => state.uiReducer.selectedTags)

    const searchText = useSelector(state => state.uiReducer.search)

    let filtWebsites = websites

    if (selectedCategories.length >= 1) {
        filtWebsites = filtWebsites.filter(website => website.categories.some(category => selectedCategories.includes(category.name)))
    }
    if (selectedTags.length >= 1) {
        filtWebsites = filtWebsites.filter(website => website.tags.some(tag => selectedTags.includes(tag.name)))
    }

    if (searchText) {
        filtWebsites = filtWebsites.filter(website => {
            return website.name.toLowerCase().includes(searchText.toLowerCase())
                || website.description.toLowerCase().includes(searchText.toLowerCase())
                || website.url.toLowerCase().includes(searchText.toLowerCase())
        })
    }

    if (isLoading) return <Spinner animation="border" variant="primary" />
    console.log('websites', websites)



    return (<div className=" mx-auto mt-4 website-container">
        <div className="row row-cols-4">
            {filtWebsites.map(website => <Website website={website} key={website.id} />)}
        </div>

    </div>)

}