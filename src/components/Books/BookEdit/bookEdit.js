import React from 'react';
import {useHistory} from 'react-router-dom';

const BookEdit = (props) => {

    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        name: "",
        category: "DRAMA",
        authorId: 0,
        availableCopies: 0
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name !== "" ? formData.name : props.product.name;
        const availableCopies = formData.availableCopies  !== 0 ? formData.availableCopies : props.product.availableCopies;
        const category = formData.category!== "DRAMA" ? formData.category : props.product.category;
        const authorId = formData.authorId!== 0 ? formData.authorId : props.product.authorId;

        props.onEditBook(props.product.id,name, category,authorId,availableCopies);
        history.push("/books");
    }

    return(
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               required
                               placeholder={props.product.name}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Available Copies</label>
                        <input type="text"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               placeholder={props.product.availableCopies}
                               required
                               onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control" onChange={handleChange}>
                            {props.categories.map((term) =>
                                {
                                    if(props.product.category !== undefined &&
                                        props.product.category === term)
                                        return <option selected={props.product.category} value={term.id}>{term.name}</option>
                                    else return <option value={term}>{term}</option>

                                }
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select name="authors" className="form-control" onChange={handleChange}>
                            {props.authors.map((term) =>
                                {
                                    if(props.product.category !== undefined &&
                                        props.product.category.id === term.id)
                                        return <option selected={props.product.category.id} value={term.id}>{term.name}</option>
                                    else return <option value={term.id}>{term.name}{term.surname}</option>
                                }
                            )}
                        </select>
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default BookEdit;