// src/components/DoctorForm.tsx
import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const initialValues = {
    name: '',
    specialization: '',
    experience: 0,
    phone: '',
    email: '',
    avatar: '',
    availability: [
        { day: '', startTime: '', endTime: '' }
    ]
};

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    specialization: Yup.string().required('Required'),
    experience: Yup.number().min(0).required('Required'),
    phone: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    avatar: Yup.string().url('Invalid URL').required('Required'),
    availability: Yup.array().of(
        Yup.object({
            day: Yup.string().required('Required'),
            startTime: Yup.string().required('Required'),
            endTime: Yup.string().required('Required'),
        })
    )
});

const DoctorForm = () => {
    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('/api/doctors', values);
            console.log('Doctor added:', response.data);
            alert('Doctor successfully added!');
        } catch (error) {
            console.error('Error posting doctor:', error);
            alert('Failed to add doctor');
        }
    };

    return (
        <div>
            <h1>Hii</h1>
        </div>
    );
};

export default DoctorForm;
