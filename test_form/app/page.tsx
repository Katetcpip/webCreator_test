"use client";

import classes from '@/styles/pagesStyles/mainPage.module.scss'
import { useEffect, useState, useRef } from 'react';
import { ArrowSvg } from '@/components/Svgs';
import axios from 'axios';
import SuccessTip from '@/components/Singular/App/SuccessTip';
import ButtonSend from '@/components/Singular/App/ButtonSend';

export default function Home() {

    const [isActive, setIsActive] = useState(false); //для категории дроплауна
    const [isActiveRow, setIsActiveRow] = useState(false); //для дропдауна подкатегории

    const [showTip, setShowTip] = useState(false); 

    const popup1Ref = useRef<HTMLDivElement | null>(null); //реф для певрого дропдауна
    const popup2Ref = useRef<HTMLDivElement | null>(null); //реф для второго дропдауна

    const [categories, setCategories] = useState<Array<Category>>([]); //категории
    const [subcategories, setSubcategories] = useState<Array<any>>([]); //подкатегории

    const [data, setData] = useState(() => {
        const savedData = localStorage.getItem('data');
        return savedData ? JSON.parse(savedData) : {category: 'Choose Category', subcategory: 'Choose Subcategory'};
    }); // проверка, есть ли данные в хранилище и установка дефолтных значений, если нет

    const [formData, setFormData] = useState(data);

    useEffect(() => {
        setFormData(data);
    }, [data]); // formdata нужна для заполнения полей формы, чтобы при очищении не очищался localStorage
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!popup1Ref.current?.contains(event.target as Node) &&
                !document.getElementById("category")?.contains(event.target as Node)) {
                setIsActiveRow(false);
            }
            if (!popup2Ref.current?.contains(event.target as Node) &&
                !document.getElementById("subcategory")?.contains(event.target as Node)) {
                setIsActive(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []); // функция фиксирования закрытия дропдаунов при клике вне их

    const getCategory = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        categories.length === 0 ?
            axios({
                url: 'https://web-creator.ru/test/frontend/categories',
                method: 'get'
            }).then(response => {
                response.data !== undefined && setCategories(response.data.categories)
                setIsActiveRow(true)
            }).catch(err => console.log('Error'))
        : setIsActiveRow(true);
    }; // получение категорий при клике на дропдаун по заданию

    const getSubcategory = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsActive(true);
    }; // открытие подкатегорий

    const chooseCategory = (e : React.MouseEvent<HTMLDivElement, MouseEvent>, category : any) => {
        e.preventDefault();
        e.stopPropagation();

        setData((prevData : any) => ({ ...prevData, category: category.name }));
        setIsActiveRow(false);
        axios.get('https://web-creator.ru/test/frontend/categories', {
            params: { parent_id: category.id }
        }).then(response => {
            response.data !== undefined && setSubcategories(response.data.categories)
            setData((prevData : any) => ({ ...prevData, subcategory: 'Choose Subcategory' }));
        }).catch(err => console.log('Error'))

    }; // выбор категории и запрос для подкатегорий

    const chooseSubcategory = (e : React.MouseEvent<HTMLDivElement, MouseEvent>, subcategory : any) => {
        e.preventDefault();
        e.stopPropagation();

        setData((prevData : any) => ({ ...prevData, subcategory: subcategory }));
        setIsActive(false);
    }; // выбор подкатегории и сет в дату

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data));
    }, [data]); //сохранение данных в localStorage при изменении data
    
    return (
        <div className={classes['mainPage']}>
            <div className={classes['animation-block'] + " animation-block"}>
                <div className={classes.mainPage__formData}>
                    <h1>Choose data to send</h1>

                    <h4>Category</h4>
                    <button id="category" className={classes.mainPage__formData__item} style={{zIndex:'250'}} onClick={(e) => getCategory(e)}>
                            <span id="popup11">{formData.category}</span>
                            <ArrowSvg/>
                            <div ref={popup1Ref} className={classes.mainPage__dropdown + (!isActiveRow ? ' closed' : '')}>
                                {categories.length !== 0 ?
                                    categories.map(el => 
                                        <div key={el.id} onClick={(e) => chooseCategory(e, el)} className={classes.mainPage__dropdown__category}>
                                        {el.name}
                                    </div>
                                )
                                : null
                                }
                            </div>
                    </button>

                    <h4>Subcategory</h4>
                    <button id="subcategory" className={classes.mainPage__formData__item} onClick={(e) => getSubcategory(e)}>
                            <span id="popup22">{formData.subcategory}</span>
                            <ArrowSvg/>
                            <div ref={popup2Ref} className={classes.mainPage__dropdown + (!isActive ? ' closed' : '')}>
                                {subcategories.length !== 0 ?
                                    subcategories.map(el => 
                                        <div key={el.id} onClick={(e) => chooseSubcategory(e, el.name)} className={classes.mainPage__dropdown__category}>
                                            {el.name}
                                        </div>
                                )
                                : null
                                }
                            </div>
                    </button>

                    <ButtonSend data={data} setShowTip={setShowTip} formData={formData} setFormData={setFormData}/>

                </div>
                                
                <SuccessTip showTip={showTip}/>

            </div>
        </div>
    )
}
interface Category {
    id: number;
    name: string;
}