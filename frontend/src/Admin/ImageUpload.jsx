import React, { useState } from 'react'
import { GetServerPath } from '../helpers/Lookup';
import { Button } from 'reactstrap';

function ImageUpload(props) {

    const [defaultImage, setDefaultImage] = useState(props.DefaultImage);
    const [selectedImage, setSelectedImage] = useState("");
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setSelectedImage(reader.result);
                if (props.OnImageSelected)
                    props.OnImageSelected(reader.result);
            };

            reader.readAsDataURL(file);
        } else {
            // If no file is selected, reset to the default image
            setSelectedImage(null);
        }
    };

    const handleRemoveImage = () => {
        setDefaultImage("");
        setSelectedImage(null);
    };

    const getDefaultImageUrl = (image) => {
        if (image)
            return GetServerPath() + image;
        else
            return "https://via.placeholder.com/" + props.Width + "x" + props.Height + "?text=No+Image";
    }

    return (
        <div>
            <label>{props.Label}</label>
            <input type="file" className="d-none" onChange={handleImageChange} />
            {selectedImage ? (
                <div>
                    <img src={selectedImage} className='img-fluid mb-1' alt="Preview" /><br />
                    <Button type="button" className='me-2' size='sm' color="primary" outline onClick={() => document.querySelector('input[type="file"]').click()}>Change Image</Button>
                    <Button type="button" size='sm' color="danger" onClick={handleRemoveImage}>Remove Image</Button>
                </div>
            ) : (
                <div>
                    <img
                        src={getDefaultImageUrl(defaultImage)} // Replace with the path to your default image
                        alt="Default"
                        className='img-fluid mb-1'
                        style={{ width: props.Width + "px", height: props.Height + "px" }}
                    />
                    <br />
                    <Button type="button" size='sm' color="primary" outline onClick={() => document.querySelector('input[type="file"]').click()}>Select Image</Button>
                </div>
            )}
        </div>
    );
};

export default ImageUpload