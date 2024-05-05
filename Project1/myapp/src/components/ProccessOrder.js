import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { withRouter } from "./withRouter";


import '../components/CSS/shippingForm.css';

function ProccessOrder(props) {
    const location = useLocation();
    const total = location.state?.data;
    const total2 = location.state?.data2;

    const [data, setData] = useState({
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!data.addressLine1.trim()) {
            errors.addressLine1 = "Address Line 1 is required";
            isValid = false;
        }

        if (!data.city.trim()) {
            errors.city = "City is required";
            isValid = false;
        }

        if (!data.postalCode.trim()) {
            errors.postalCode = "Postal Code is required";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios.post(`http://localhost:5000/delivery/add`, data)
                .then((res) => {
                    alert(`Added Successfully`);
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div>
            <h1 style={{ backgroundColor: "gray" }}>Shipping address</h1>
            <Form {...props}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>AddressLine_1</Form.Label>
                    <Form.Control type="text" placeholder="addressLine1"
                        value={data.addressLine1}
                        name="addressLine1"
                        onChange={handleChange}
                        isInvalid={!!errors.addressLine1}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.addressLine1}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>AddressLine_2</Form.Label>
                    <Form.Control type="text" placeholder="addressLine2"
                        value={data.addressLine2}
                        name="addressLine2"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>City</Form.Label>
                    <Form.Control as="select"
                        name="city"
                        value={data.city}
                        onChange={handleChange}
                        isInvalid={!!errors.city}>
                        <option value="">Select</option>
                        <option value="Ampara">Ampara</option>
                        {/* Add other options */}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {errors.city}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control type="text" placeholder="postalCode"
                        value={data.postalCode}
                        name="postalCode"
                        onChange={handleChange}
                        isInvalid={!!errors.postalCode}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.postalCode}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" style={{ backgroundColor: "darkBlue" }} onClick={handleClick}>
                    Next
                </Button>
            </Form>
        </div>
    );
}
export default withRouter(ProccessOrder);
