import React, { useEffect, useReducer } from 'react';
import { useCallback } from 'react';
import { Layout } from 'antd';
import { ICookie } from '@domain/entities';
import { DEFAULT_COOKIE_FILTER, ICookieFilter } from '@domain/ports';
import { useGetCookies, useGetToppings } from '@secondary';
import { Cookie } from '../cookie/Cookie';
import { Filter } from '../filter/Filter';
import reducer, { initialState } from './reducer';
import styles from './Store.module.scss';

const { Content } = Layout;

function Store(): JSX.Element {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { filter, cookies, toppings } = state;

    const loadCookies = useGetCookies();
    const loadToppings = useGetToppings();

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const payload = await loadCookies(filter);
            dispatch({ type: 'COOKIE_REQUEST_SUCCESS', payload });
        };

        fetchData();
    }, [filter, loadCookies]);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const payload = await loadToppings();
            dispatch({ type: 'TOPPING_REQUEST_SUCCESS', payload });
        };

        fetchData();
    }, [loadToppings]);

    const handleFilterChange = useCallback((f: ICookieFilter | null): void => {
        const payload = f ?? structuredClone(DEFAULT_COOKIE_FILTER);
        dispatch({ type: 'FILTER_SETTING', payload });
    }, []);

    return (
        <React.Fragment>
            <Content className={styles['filter-content']}>
                <div className={styles['filter-content__container']}>
                    <Filter
                        filter={filter}
                        toppings={toppings}
                        handleFilterChange={handleFilterChange}></Filter>
                </div>
            </Content>

            <Content className={styles['product-content']}>
                <div className={styles['product-content__container']}>
                    {cookies.map((cookie: ICookie) => (
                        <Cookie key={cookie.id} item={cookie}></Cookie>
                    ))}
                </div>
            </Content>
        </React.Fragment>
    );
}

export default Store;
