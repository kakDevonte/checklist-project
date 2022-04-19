import React, {useState} from 'react'
import {ROLES} from '../utils/roles'

export const CheckItem = (props) => {

    const {item, index} = props

    const [form, setForm] = useState({
        id: item.id, title: item.title, completed: item.completed, isImportant: item.isImportant
    })

    const handleChange = () => {
        setForm({...form, completed: !form.completed})

    }

    return (
        <div className="container mt-2 " key={form.id}>
            {/*<div className="row">*/}
            {/*    <div className="col-10">*/}
            {/*        <div className="d-flex align-items-stretch">*/}
            {/*            {form.isImportant*/}
            {/*                ? <span className="border border-danger border-4 me-2"/>*/}
            {/*                : <span className="border border-white border-4 me-2"/>}*/}
            {/*            <p className="text-break" aria-label="С текстовым полем">{index}.{form.title}</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="col-2">*/}
            {/*        {role === ROLES.Head || checklist.completed ?*/}
            {/*            <input className="form-check-input mt-2 d-print-none" type="checkbox"*/}
            {/*                   checked={form.completed}*/}
            {/*                   onChange={() => handleChange()} disabled/> :*/}
            {/*            <input className="form-check-input mt-2 d-print-none" type="checkbox"*/}
            {/*                   checked={form.completed}*/}
            {/*                   onChange={() => handleChange()}/>*/}
            {/*        }*/}
            {/*        <label className="form-check-label mt-1 ms-1 d-print-none" htmlFor="flexCheckDefault">*/}
            {/*            Выполнено*/}
            {/*        </label>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}