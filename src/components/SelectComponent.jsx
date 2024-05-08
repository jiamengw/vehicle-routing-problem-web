import React, { useState } from 'react';
import { Radio } from 'antd';

const SelectComponet = ({ data = [], bestRoutName, onDataPass }) => {
      const [size, setSize] = useState(() => {
        return data.findIndex(item => item.routName == bestRoutName)
      });
    const options = data?.map((item, index) => {
        if (item.routName == bestRoutName) {
            return ({
                value: index,
                label: "最佳方案" + (index + 1) + "(" + item.fitness + ")",
            });
            // setSize(index);
        } else {
            return ({
                value: index,
                label: item.routName + "(" + item.fitness + ")",
            });
        }
    });

    const handleSizeChange = (e) => {
        setSize(e.target.value);
        onDataPass(data[e.target.value])
    };


    return (
        <>
            <Radio.Group value={size} onChange={handleSizeChange} options={options} style={{ marginLeft: '100px' }} />
            <br />
            <br />
        </>
    );
};
export default SelectComponet;