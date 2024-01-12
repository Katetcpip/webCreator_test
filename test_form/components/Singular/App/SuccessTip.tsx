"use client";

import classes from '@/styles/pagesStyles/mainPage.module.scss'
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface SuccessTipProps {
    showTip: boolean;
  }

export default function SuccessTip({showTip} : SuccessTipProps) {

    const tipRef = useRef(null); //реф для анимирования сообщения об отправке

    useEffect(() => {
        if (showTip) {
            gsap.to(tipRef.current, { autoAlpha: 1, duration: 1 });
        } else {
            gsap.to(tipRef.current, { autoAlpha: 0, duration: 1 });
        }
    }, [showTip]); // анимация для плавного показа уведомления об отправке

    return (                
        <div ref={tipRef} className={classes.mainPage__success}>
            Success
        </div>
    )
}
