import React from 'react';

export default function LoadingContainer(props) {
    const [isLoaded, setLoaded] = React.useState(false);
    const [data, setData] = React.useState({});
    const component = props.component;
    const fct = props.toLoad;

    React.useEffect(()  => {
        async function fetchData() {
            const fetchedData = await fct();
            setData(fetchedData);
            setLoaded(true);
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    return (
        !isLoaded ? props.loadingComponent : React.cloneElement(component, {data: data})
    )
}