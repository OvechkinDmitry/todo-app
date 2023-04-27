import React, {FC} from 'react';
import './toggle.css'

type TToggle = {
    setChecked: (v: boolean) => void
    isChecked: boolean | null
}


export const Toggle: FC<TToggle> = ({setChecked, isChecked}) => {

    return (
        <div className={'toggle-checkbox'}>
            <input checked={!!isChecked} onChange={(e) => setChecked(e.target.checked)} type={'checkbox'}/>
        </div>
    );
};

