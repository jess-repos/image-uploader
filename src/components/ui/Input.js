import React from 'react'
import "./Input.css"

export default function Input({fullWidth = false, value}) {
    return (
        <input className={`input ${fullWidth && "full-width"}`} type="text" value={value} readOnly />
    )
}
