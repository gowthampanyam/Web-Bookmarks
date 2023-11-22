import { Badge, Spinner } from "react-bootstrap"
import { useGetTagsQuery } from "../api/apiSlice"
import { useDispatch, useSelector } from "react-redux"
import { addSelectedTag, removeSelectedTag } from "../../app/uiSlice"

export const TagContainer = () => {

    const { data: tags = [], isLoading } = useGetTagsQuery()
    const selectedTags = useSelector(state => state.uiReducer.selectedTags)
    const dispatch = useDispatch()


    const onTagClicked = (tagName) => {
        if (selectedTags.includes(tagName)) dispatch(removeSelectedTag(tagName))
        else dispatch(addSelectedTag(tagName))
    }


    if (isLoading) return <Spinner animation="border" variant="primary" />
    console.log('tags', tags)

    return (
        <div className="tag-container">
            {tags.map(tag =>
                <h5 className="category-badge" key={tag.id}>
                    <Badge pill className={selectedTags.includes(tag.name) ? "selected-tag" : "default-tag"} onClick={() => onTagClicked(tag.name)}>{tag.name.toLowerCase()}</Badge>
                </h5>

            )}
        </div>

    )
}