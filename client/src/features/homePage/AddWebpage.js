import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import { forwardRef, useState } from "react"
import { useCreateWebsiteMutation, useGetCategoriesQuery, useGetTagsQuery } from '../api/apiSlice';
import { Button, Badge } from 'react-bootstrap';
import { Grid } from '@mui/material';



const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export const AddWebpage = ({ open, handleClose }) => {


    const { data: tags = [], isLoading: isLoadingTags } = useGetTagsQuery()
    const { data: categories = [], isLoading: isLoadingCategories } = useGetCategoriesQuery()
    const [newTags, setNewTags] = useState([])
    const [newCategories, setNewCategories] = useState([])
    const [createWebsite] = useCreateWebsiteMutation()
    const [url, setUrl] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")


    const onTagClicked = (tag) => {
        const currentTags = newTags
        console.log('currentTags', currentTags)
        if (currentTags.includes(tag.name)) {
            setNewTags(currentTags.filter(t => t !== tag.name))
        } else {
            setNewTags([...currentTags, tag.name])
        }
    }

    const onCategoryClicked = (category) => {
        const currentCategories = newCategories
        if (currentCategories.includes(category.name)) {
            setNewCategories(currentCategories.filter(c => c !== category.name))
        } else {
            setNewCategories([...currentCategories, category.name])
        }
    }


    const onAddClicked = () => {
        const website = {
            url,
            name,
            description,
            tags: tags.filter(t => newTags.includes(t.name)),
            categories: categories.filter(c => newCategories.includes(c.name))
        }
        createWebsite(website).unwrap().then(response => {
            console.log(response)
            setNewTags([])
            setNewCategories([])
            setUrl("")
            setName("")
            setDescription("")
            handleClose()
        })

    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Add new website"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <b>Fill in the data to add a new website</b>
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Link"
                    fullWidth
                    variant="standard"
                    value={url}
                    onChange={ev => setUrl(ev.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Title"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={ev => setName(ev.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Description"
                    fullWidth
                    variant="standard"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}
                />
                <DialogContentText id="alert-dialog-slide-description">
                    <b>Select relevant category / categories</b>
                </DialogContentText>
                <Grid container>
                    {categories.map(category =>
                        <Grid item key={category.id} onClick={() => onCategoryClicked(category)}>
                            <Badge className={newCategories.includes(category.name) ? "selected-category" : "default-category"}
                            >
                                {category.name}
                            </Badge>
                        </Grid>
                    )}
                </Grid>
                <DialogContentText id="alert-dialog-slide-description">
                    <b>Select relevant tags</b>
                </DialogContentText>
                <Grid container>
                    {tags.map(tag =>
                        <Grid item key={tag.id} onClick={() => onTagClicked(tag)}>
                            <Badge className={newTags.includes(tag.name) ? "selected-tag" : "default-tag"}>
                                {tag.name}
                            </Badge>
                        </Grid>)}
                </Grid>




            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={onAddClicked}>Add Site</Button>
            </DialogActions>
        </Dialog>)
}