import { ICookie, ITopping } from '@domain/entities';
import { DEFAULT_COOKIE_FILTER, ICookieFilter } from '@domain/ports';

type State = {
    filter: ICookieFilter;
    cookies: readonly ICookie[];
    toppings: readonly ITopping[];
};

type Request<Str extends string> = `${Uppercase<Str>}_REQUEST`;
type Pending<T extends Request<string>> = `${T}_PENDING`;
type Success<T extends Request<string>> = `${T}_SUCCESS`;

type CookieRequest = Request<'cookie'>;
type ToppingRequest = Request<'topping'>;

type CookieActions = Pending<CookieRequest> | Success<CookieRequest>;
type ToppingActions = Pending<ToppingRequest> | Success<ToppingRequest>;

type FilterAction = 'FILTER_SETTING';

type ActionType = CookieActions | ToppingActions | FilterAction;

export interface IAction {
    type: ActionType;
    payload?: unknown;
}

export const initialState: State = {
    filter: structuredClone(DEFAULT_COOKIE_FILTER),
    cookies: [],
    toppings: []
};

const reducer = (state = initialState, action: IAction): State => {
    switch (action.type) {
        case 'COOKIE_REQUEST_SUCCESS':
            return <State>{ ...state, cookies: action.payload as ICookie[] };
        case 'TOPPING_REQUEST_SUCCESS':
            return <State>{ ...state, toppings: action.payload as ITopping[] };
        case 'FILTER_SETTING':
            return <State>{ ...state, filter: action.payload as ICookieFilter };
        default:
            return state;
    }
};

export default reducer;
