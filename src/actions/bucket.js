import { useSyncExternalStore, useRef, useCallback } from 'react';

export const compareStringified = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const bucket = (initialState) => {
    let subscribers = new Set();
    let newBucket = {};
    newBucket.store = typeof initialState === 'undefined' ? { state: null } : { state: initialState };

    newBucket._get = () => newBucket.store;
    newBucket.get = (selector) => selector ? selector(newBucket.store.state || {}) : newBucket.store.state;
    newBucket.set = (toValue) => {
        if (typeof toValue === 'function') {
            toValue = toValue(newBucket.get());
        }
        newBucket.store = { state: toValue };
        newBucket.emit();
    };
    newBucket.assign = (toValue) => {
        newBucket.store = { state: Object.assign({}, newBucket.store.state, toValue) };
        newBucket.emit();
    }
    newBucket.subscribe = (subscriber) => {
        subscribers.add(subscriber);
        return () => subscribers.delete(subscriber);
    }
    newBucket.emit = () => {
        subscribers.forEach(subscriber => subscriber(newBucket._get()));
    }
    newBucket.copy = (selector) => structuredClone(newBucket.get(selector));
    return newBucket;
};

export function useBucket(bucket, stateComparator) {
    let currentStore = useRef(bucket._get());
    const getSnapshot = () => bucket._get();
    let newState = useSyncExternalStore(
        useCallback(cb =>
            bucket.subscribe((store) => {
                const nextStore = store;
                if (stateComparator && stateComparator(currentStore.current.state, nextStore.state)) return;
                if (!stateComparator && currentStore.current === nextStore) return;
                currentStore.current = nextStore;
                cb();
            }), []),
        getSnapshot,
        getSnapshot,
    );
    return newState.state;
}

export function useBucketSelector(bucket, selector, stateComparator) {
    let currentStore = useRef(bucket.get(selector));
    const getSnapshot = () => bucket.get(selector);
    let newState = useSyncExternalStore(
        useCallback(cb =>
            bucket.subscribe((store) => {
                const nextState = selector(store.state || {});
                if (stateComparator && stateComparator(currentStore.current, nextState)) return;
                if (!stateComparator && currentStore.current === nextState) return;
                currentStore.current = nextState;
                cb();
            }), []),
        getSnapshot,
        getSnapshot,
    );
    return newState;
}