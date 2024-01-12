"use client";

import classes from '@/styles/pagesStyles/mainPage.module.scss'
import { useRef, useEffect } from 'react';
import axios from 'axios';

interface Props {
    data: any;
    setShowTip: any;
    setFormData: any;
    formData: any
  }

export default function ButtonSend({data, setShowTip, setFormData, formData} : Props) {

    const isDataComplete = () => {
        return formData.category !== 'Choose Category' && formData.subcategory !== 'Choose Subcategory';
    }; // проверка на заполненность формы, чтобы активировать кнопку отправки

    const sendData = () => {
        axios.post('https://web-creator.ru/test/frontend/categories', {
            category: data.category,
            subcategory: data.subcategory
        }).then(response => {
            if (response.status === 200) {
                setFormData({ category: 'Choose Category', subcategory: 'Choose Subcategory' });
                setShowTip(true)
                setTimeout(() => {
                    setShowTip(false)
                }, 1500)
            } else {
                console.log('Error sending data', response.status);
            }
        }).catch(err => console.log('Error'))
    }; // отправка данных на сервер и очистка формы

    return (                
        <button 
        className={isDataComplete() ? classes.mainPage__sendButton : classes.mainPage__sendButtonDisabled} 
        disabled={!isDataComplete()} 
        onClick={sendData}
    >
        Send
    </button>
    )
}
