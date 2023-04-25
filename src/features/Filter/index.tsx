import React from 'react';
import {
    Space, Input, Select, Tag, Tooltip,
} from 'antd';

import styles from './index.css';

interface FilterProps {
    inputText: string;
    onChangeInput(name: string): void;
    allTypes: string[];
    filterTypes: string[];
    setFilterTypes(types: string[]): void;
}

const Filter: React.FC<FilterProps> = ({
    inputText,
    onChangeInput,
    allTypes,
    filterTypes,
    setFilterTypes,
}) => {
    const handleClose = (removedTag: string) => {
        const newTags = filterTypes.filter((tag) => tag !== removedTag);
        setFilterTypes(newTags);
    };

    const addTag = (value: string) => {
        setFilterTypes([...filterTypes, value]);
    };

    const getOptions = () => (
        allTypes
            .filter(
                (type) => !filterTypes.some((choosenType) => type === choosenType),
            )
            .map((type) => ({ value: type, label: type }))
    );

    return (
        <div className={`${styles.Wrapper}`}>
            <h2 className={styles.Header}>Filter</h2>
            <div className={styles.Row}>
                <h3>By name:</h3>
                <Input
                    placeholder="Name Filter"
                    value={inputText}
                    onChange={(event) => onChangeInput(event.target.value)}
                />
            </div>
            <div className={styles.Row}>
                <h3>By type:</h3>
                <Space size={[0, 8]} wrap>
                    <Space size={[0, 8]} wrap>
                        {filterTypes.map((tag) => {
                            const isLongTag = tag.length > 20;
                            const tagElem = (
                                <Tag
                                    key={tag}
                                    closable
                                    style={{ userSelect: 'none' }}
                                    onClose={() => handleClose(tag)}
                                >
                                    <span>
                                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                    </span>
                                </Tag>
                            );
                            return isLongTag ? (
                                <Tooltip title={tag} key={tag}>
                                    {tagElem}
                                </Tooltip>
                            ) : (
                                tagElem
                            );
                        })}
                    </Space>
                    <Select
                        value="Add Type"
                        style={{ width: 120 }}
                        onChange={addTag}
                        options={getOptions()}
                    />
                </Space>
            </div>
        </div>
    );
};

export default Filter;
